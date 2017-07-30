#!/usr/bin/env node

const chalk = require('chalk');
const googleCredentials = require('./google_credentials');

const log = console.log;
const print = chalk.green;
const error = chalk.bold.red;

googleCredentials.get()
  .then(credentials => log(print('CREDENTIALS'), credentials))
  .catch((err) => {
    log(error('ERROR getting Google API credentials'));
    throw err;
  });
