const youtube = require('googleapis').youtube('v3');

const googleOAuthClient = require('./google_oauth_client');

module.exports.get = playlistId => new Promise((resolve, reject) =>
  googleOAuthClient.get()
    .then(oAuthCient =>
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

        resolve(data.items.map(video => ({
          id: video.snippet.resourceId.videoId,
          title: video.snippet.title,
        })));
      })
    )
    .catch(err => reject(err))
);
