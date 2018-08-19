'use strict';

require('dotenv').config();

const { isNil } = require('lodash');

const {
  getCurrentSpecialsMonthYear,
  getSpecials,
  cloneRepoAndUpdate,
  createToken,
  validateToken,
} = require('./helpers');

const corsHeaders = {
  'Content-Type': 'application/json',
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Credentials" : true,
};
const noCacheHeaders = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};
const baseHeaders = Object.assign({}, corsHeaders, noCacheHeaders);

async function login(event, context, callback) {
  const { body } = event;
  const { username, password } = JSON.parse(body);

  const { success, token } = await createToken({ username, password });

  const response = {
    statusCode: 200,
    headers: baseHeaders,
    body: JSON.stringify({ success, token }),
  }

  callback(null, response);
}

async function data(event, context, callback) {
  const authorizationHeader = event.headers['Authorization'];
  if (isNil(authorizationHeader)) {
    return callback(null, { statusCode: 403, headers: baseHeaders });
  }

  const token = authorizationHeader.substr('Bearer '.length);
  const { success } = await validateToken(token);

  if (!success) {
    return callback(null, { statusCode: 403, headers: baseHeaders });
  }

  const monthYear = await getCurrentSpecialsMonthYear();
  const specials = await getSpecials(monthYear);

  const response = {
    statusCode: 200,
    headers: baseHeaders,
    body: JSON.stringify({
      current: monthYear,
      specials,
    }),
  }
  return callback(null, response);
}

async function saveNewData(event, context, callback) {
  const authorizationHeader = event.headers['Authorization'];
  if (isNil(authorizationHeader)) {
    return callback(null, { statusCode: 403, headers: baseHeaders });
  }

  const token = authorizationHeader.substr('Bearer '.length);
  const { success } = await validateToken(token);

  if (success) {
    const { body } = event;
    const json = JSON.parse(body);

    try {
      await cloneRepoAndUpdate(json);

      const response = {
        statusCode: 200,
        headers: baseHeaders,
        body: JSON.stringify({
          event,
          context
        }),
      }

      return callback(null, response);
    } catch (err) {
      callback(err);
    }
  }
  
  return callback(null, { statusCode: 403, headers: baseHeaders });
}

module.exports = {
  data,
  saveNewData,
  login,
};