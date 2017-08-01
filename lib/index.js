#!/usr/bin/env node

const os = require('os');
const childProcess = require('child_process');
const chalk = require('chalk');

const youtubePlaylist = require('./youtube_playlist');
const youtubePlaylistItem = require('./youtube_playlist_item');

const log = console.log;
const print = chalk.green;
const error = chalk.bold.red;

// check our big requirements, youtube-dl and windows
// this is far from perfect, but should work on the expected situation
// execSync will throw if not found
childProcess.execSync('command -v youtube-dl 2>&1');
if (os.platform() === 'win32') {
  throw new Error(error('This will probably work on windows, but not tested, so stop!'));
}

youtubePlaylist.get()
  .then((playlistId) => {
    log(print('PLAYLIST ID'), playlistId);
    youtubePlaylistItem.get(playlistId)
      .then(videos => videos.forEach(video => log(print('VIDEO'), video)))
      .catch((err) => {
        log(error('PETATE'));
        throw err;
      });
  })
  .catch((err) => {
    log(error('PETATE'));
    throw err;
  });
