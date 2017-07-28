#!/usr/bin/env node

const google = require('googleapis');
const inquirer = require('inquirer');

const googleApiConfig = require('./config');

const REDIRECT_URL = 'urn:ietf:wg:oauth:2.0:oob';

const oauth2Client = new google.auth.OAuth2(
  googleApiConfig.CLIENT_ID,
  googleApiConfig.CLIENT_SECRET,
  REDIRECT_URL
);

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // will return a refresh token
  scope: 'https://www.googleapis.com/auth/plus.me', // can be a space-delimited string or an array of scopes
});

console.log('Visit the url: ', url);

inquirer.prompt({
  type: 'input',
  name: 'code',
  message: 'Paste the code from Google:',
}).then(answers => console.log(JSON.stringify(answers, null, '  ')));
