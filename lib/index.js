#!/usr/bin/env node

const chalk = require('chalk');

const youtubePlaylist = require('./youtube_playlist');
const youtubePlaylistItem = require('./youtube_playlist_item');

const log = console.log;
const print = chalk.green;
const error = chalk.bold.red;

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
