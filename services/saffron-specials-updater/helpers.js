const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const child_process = require('child_process');
const axios = require('axios');
const rimrafCb = require('rimraf');
const lambdaGit = require('lambda-git');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const rimraf = promisify(rimrafCb);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const exec = promisify(child_process.exec);

const ISSUER = 'saffron-specials-updater'

async function createToken({ username, password }) {
  const hash = process.env.PASSWORD_HASH;
  const correctPassword = await bcrypt.compare(password, hash);

  return new Promise((resolve) => {
    if (username === process.env.USERNAME && correctPassword) {
      jwt.sign({}, process.env.JWT_SECRET, {
        expiresIn: '7d',
        issuer: ISSUER,
      }, (err, token) => {
        if (err) {
          return resolve({
            success: false,
            token: '',
          });
        }
        return resolve({
          success: true,
          token,
        })
      });
    } else {
      return resolve({
        success: false,
        token: '',
      });
    }
  });
}

async function validateToken(token) {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.JWT_SECRET, {
      issuer: ISSUER,
    }, (err, decoded) => {
      if (err) {
        return resolve({
          success: false,
          decoded: {}
        });
      }
      return resolve({
        success: true,
        decoded,
      });
    });
  });
}

async function getCurrentSpecialsMonthYear() {
  const { data } =
    await axios.get(
      'https://raw.githubusercontent.com/LeungEnterprisesHosting/saffron-indian/master/src/specials-data/current.json'
    );
  const { month, year } = data;
  return { month, year };
}

async function getSpecials({ month, year }) {
  const { data } =
    await axios.get(`https://raw.githubusercontent.com/LeungEnterprisesHosting/saffron-indian/master/src/specials-data/${year}/${month.toLowerCase()}.json`);
  const { appetizers, entrees } = data;
  return { appetizers, entrees };
}

async function cloneRepoAndUpdate({ current, specials }) {
  const { year, month } = current;

  await lambdaGit();
  const tmpDir = '/tmp';
  // Clear directory if it already exists
  const repoDir = path.join(tmpDir, 'saffron-indian');
  await rimraf(repoDir);
  const gitEnv = Object.assign({}, process.env, {
    // Without this variable, command errors
    SUPPRESS_HANDLE_INHERITANCE_WARNING: 1
  });
  await exec(
    `git clone https://${process.env.GITHUB_TOKEN}@github.com/leungenterpriseshosting/saffron-indian`,
    { cwd: tmpDir, env: gitEnv }
  );
  const specialsDir = path.join(repoDir, 'src', 'specials-data', year);
  if (!fs.existsSync(specialsDir)) {
    await mkdir(specialsDir);
  }
  const currentFile = path.join(repoDir, 'src', 'specials-data', 'current.json');
  await writeFile(
    currentFile,
    JSON.stringify(Object.assign({}, current, {
      rev: uuidv4(),
    })),
    'utf8'
  );
  const specialsFile = path.join(specialsDir, `${month.toLowerCase()}.json`);
  await writeFile(
    specialsFile,
    JSON.stringify(Object.assign({}, specials, {
      rev: uuidv4(),
    })),
    'utf8'
  );
  await exec(
    "git config user.name \"Saffron Indian Kitchen\"",
    { cwd: repoDir, env: gitEnv }
  );
  await exec(
    "git config user.email \"18nleung+saffronindian@gmail.com\"",
    { cwd: repoDir, env: gitEnv }
  );
  await exec(
    `git add ${specialsFile} ${currentFile}`,
    { cwd: repoDir, env: gitEnv }
  );
  await exec(
    `git commit -m "Update specials for ${month} ${year}"`,
    { cwd: repoDir, env: gitEnv }
  );
  await exec(
    'git push -u origin master',
    { cwd: repoDir, env: gitEnv }
  );
}

module.exports = {
  createToken,
  validateToken,
  getCurrentSpecialsMonthYear,
  getSpecials,
  cloneRepoAndUpdate,
};