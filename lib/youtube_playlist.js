const youtube = require('googleapis').youtube('v3');

const googleOAuthClient = require('./google_oauth_client');

module.exports.get = () => new Promise((resolve, reject) =>
  googleOAuthClient.get()
    .then(oAuthCient =>
      youtube.playlists.list({
        auth: oAuthCient,
        part: 'id, snippet, status',
        mine: true,
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    )
    .catch(err => reject(err))
);
