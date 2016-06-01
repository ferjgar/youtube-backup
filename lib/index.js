#!/usr/bin/env node

const google = require('googleapis');
const googleApiConfig = require('./config');

const REDIRECT_URL = 'urn:ietf:wg:oauth:2.0:oob';

const oauth2Client = new google.auth.OAuth2(
  googleApiConfig.CLIENT_ID,
  googleApiConfig.CLIENT_SECRET,
  REDIRECT_URL
);

function getAccessToken(client, callback) {
  // generate consent page url
  const url = client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/plus.me', // can be a space-delimited string or an array of scopes
  });

  console.log('Visit the url: ', url);

  callback();
}

// retrieve an access token
getAccessToken(oauth2Client, () =>
  console.log('done')
);
