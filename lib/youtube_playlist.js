const youtube = require('googleapis').youtube('v3');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const youtubePlaylistItem = require('./youtube_playlist_item');
const { success } = require('./output');

// where the script is being executed, not the physical path of this file
const CURRENT_PATH = process.cwd();

const writeJSON = (filePath, json, reject) =>
  fs.writeFile(filePath, JSON.stringify(json), { mode: '0600' }, (err) => {
    if (err) {
      // who knows, just exit
      reject(err);
    }
  });

const select = oAuthCient => new Promise((resolve, reject) =>
  youtube.playlists.list({
    auth: oAuthCient,
    part: 'id, snippet',
    mine: true,
  }, (err, data) => {
    if (err) {
      reject(err);
      return;
    }

    writeJSON(
      path.resolve(CURRENT_PATH, 'playlist.json'),
      data.items.map(playlist => ({
        id: playlist.id,
        title: playlist.snippet.title,
      })),
      reject
    );

    inquirer.prompt({
      type: 'list',
      name: 'PLAYLIST_ID',
      message: 'Choose one playlist:',
      choices: () => data.items.map(playlist => ({
        name: playlist.snippet.title,
        value: playlist.id,
      })),
    })
      .then(answers => resolve({
        id: answers.PLAYLIST_ID,
        title: data.items.find(list => list.id === answers.PLAYLIST_ID).snippet.title,
      }))
      .catch(errInquirer => reject(errInquirer));
  })
);

const list = (oAuthCient, playlistId) => new Promise((resolve, reject) =>
  youtube.playlistItems.list({
    auth: oAuthCient,
    part: 'snippet',
    playlistId,
    // docs says that max is 50 (default 5), will need to paginate on large playlists...
    maxResults: 50,
  }, (err, data) => {
    if (err) {
      reject(err);
      return;
    }

    // pretty sure that these json structure will change in the future and this will break
    resolve(data.items.map(video => ({
      id: video.snippet.resourceId.videoId,
      title: video.snippet.title,
    })));
  })
);

module.exports.download = oAuthCient => new Promise((resolve, reject) =>
  select(oAuthCient)
    .then((playlistData) => {
      // let's not handle stupid future youtube characters
      const normalizedId = crypto.createHash('md5').update(playlistData.id).digest('hex');
      // path.resolve is the way to go for cross-platform
      const dirPath = path.resolve(CURRENT_PATH, normalizedId);

      // anti-pattern because async exists is deprecated, but we're doing a cli, so sync is fine
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }

      list(oAuthCient, playlistData.id)
        .then(videos => videos.forEach(video => youtubePlaylistItem.download(video.id, dirPath)
          .then(message => success(message))
          .catch(err => reject(err))
        ))
        .catch(err => reject(err));
    })
    .catch(err => reject(err))
);
