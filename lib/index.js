#!/usr/bin/env node

const chalk = require('chalk');

const youtubePlaylist = require('./youtube_playlist');

const log = console.log;
const print = chalk.green;
const error = chalk.bold.red;

youtubePlaylist.get()
  .then(playlist => log(print('PLAYLIST'), playlist))
  .catch((err) => {
    log(error('PETATE'));
    throw err;
  });
