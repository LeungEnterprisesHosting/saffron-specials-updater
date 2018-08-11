const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = (env, argv) => {
  let extraPlugins = [];
  if (argv.mode === 'development') {
    extraPlugins.push(new EnvironmentPlugin({
      NODE_ENV: 'development',
    }));
  }

  return {
    entry: ['babel-polyfill', path.join(__dirname, 'src', 'index.js')],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['transform-object-rest-spread']
          },
        },
      ],
    },
    plugins: [
      ...extraPlugins,
      new HtmlWebpackPlugin({
        title: 'Saffron Specials Updater',
        template: path.join(__dirname, 'src', 'index.html'),
      }),
    ],
  };
};

module.exports = config;