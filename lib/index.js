#!/usr/bin/env node

const os = require('os');
const { execSync } = require('child_process');

const googleOAuthClient = require('./google_oauth_client');
const youtubePlaylist = require('./youtube_playlist');
const { success, error } = require('./output');

// check our big requirements, youtube-dl and windows
// this is far from perfect, but should work on the expected situation
// execSync will throw if not found
execSync('command -v youtube-dl 2>&1');
if (os.platform() === 'win32') {
  throw new Error(error('This will probably work on windows, but not tested, so stop!'));
}

googleOAuthClient.get()
  .then(oAuthCient =>
    youtubePlaylist.download(oAuthCient)
      .then(() => success('ENEP'))
      .catch((err) => {
        error('PETATE SYNCING');
        throw err;
      })
  )
  .catch((err) => {
    error('PETATE ON OATH');
    throw err;
  });
