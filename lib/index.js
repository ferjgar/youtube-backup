#!/usr/bin/env node

const os = require('os');
const { execSync } = require('child_process');

const youtubePlaylist = require('./youtube_playlist');
const { error, print } = require('./output');

// check our big requirements, youtube-dl and windows
// this is far from perfect, but should work on the expected situation
// execSync will throw if not found
execSync('command -v youtube-dl 2>&1');
if (os.platform() === 'win32') {
  throw new Error(error('This will probably work on windows, but not tested, so stop!'));
}

youtubePlaylist.download()
  .then(() => print('END'))
  .catch((err) => {
    error('PETATE');
    throw err;
  });
