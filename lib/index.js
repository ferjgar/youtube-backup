#!/usr/bin/env node

const chalk = require('chalk');

const googleOAuthToken = require('./google_oauth_token');

const log = console.log;
const print = chalk.green;
const error = chalk.bold.red;

googleOAuthToken.get()
  .then(token => log(print('OAUTH TOKEN'), token))
  .catch((err) => {
    log(error('ERROR getting Google API token'));
    throw err;
  });
