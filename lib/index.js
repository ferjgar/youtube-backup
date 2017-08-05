#!/usr/bin/env node

const os = require('os');
const { execSync } = require('child_process');

const googleOAuthClient = require('./google_oauth_client');
const youtubePlaylist = require('./youtube_playlist');
const { out: { success, error } } = require('./util');

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
      .then(() => success('ENEP 🍆'))
      .catch((err) => {
        error('PETATE SYNCING');
        // better than process.exit(1)
        throw err;
      })
  )
  .catch((err) => {
    error('PETATE OATH');
    throw err;
  });
