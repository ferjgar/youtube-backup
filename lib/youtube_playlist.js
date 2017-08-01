const youtube = require('googleapis').youtube('v3');
const inquirer = require('inquirer');

const googleOAuthClient = require('./google_oauth_client');

module.exports.get = () => new Promise((resolve, reject) =>
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
            vale: playlist.id,
          })),
        })
          .then(answers => resolve(answers.PLAYLIST_ID))
          .catch(errInquirer => reject(errInquirer));
      })
    )
    .catch(err => reject(err))
);
