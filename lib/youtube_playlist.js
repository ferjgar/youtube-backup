const youtube = require('googleapis').youtube('v3');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const googleOAuthClient = require('./google_oauth_client');
const youtubePlaylistItem = require('./youtube_playlist_item');

const normalizeTitle = title => title.toLowerCase().replace(/[^a-z0-9_-]/gi, '');

const select = () => new Promise((resolve, reject) =>
  googleOAuthClient.get()
    .then(oAuthCient =>
      youtube.playlists.list({
        auth: oAuthCient,
        part: 'id, snippet',
        mine: true,
      }, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

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
    )
    .catch(err => reject(err))
);

module.exports.download = () => new Promise((resolve, reject) =>
  select()
    .then((playlistData) => {
      console.log('PLAYLIST DATA', playlistData);

      const dirPath = path.resolve(process.cwd(), normalizeTitle(playlistData.title));

      if (!fs.existsSync(dirPath)) {
        // path.resolve is the way to go for cross-platform
        fs.mkdirSync(dirPath);
      }

      youtubePlaylistItem.get(playlistData.id)
        .then(videos => videos.forEach(video => console.log('VIDEO', video)))
        .catch(err => reject(err));
    })
    .catch(err => reject(err))
);
