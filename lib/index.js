#!/usr/bin/env node

const os = require('os');
const childProcess = require('child_process');

const youtubePlaylist = require('./youtube_playlist');
const output = require('./output');

// check our big requirements, youtube-dl and windows
// this is far from perfect, but should work on the expected situation
// execSync will throw if not found
childProcess.execSync('command -v youtube-dl 2>&1');
if (os.platform() === 'win32') {
  throw new Error(output.error('This will probably work on windows, but not tested, so stop!'));
}

youtubePlaylist.download()
  .then(() => output.print('END'))
  .catch((err) => {
    output.error('PETATE');
    throw err;
  });
