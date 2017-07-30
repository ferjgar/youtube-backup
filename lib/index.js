#!/usr/bin/env node

const chalk = require('chalk');

const googleCredentials = require('./google_credentials');
const googleOAuthToken = require('./google_oauth_token');

const log = console.log;
const print = chalk.green;
const error = chalk.bold.red;

googleCredentials.get()
  .then(credentials =>
    googleOAuthToken.get(credentials)
      .then(token => log(print('OAUTH TOKEN'), token))
  )
  .catch((err) => {
    log(error('ERROR getting Google API credentials'));
    throw err;
  });
