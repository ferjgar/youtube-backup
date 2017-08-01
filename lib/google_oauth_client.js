const google = require('googleapis');
const inquirer = require('inquirer');
const chalk = require('chalk');

const googleCredentials = require('./google_credentials');

module.exports.get = () => new Promise((resolve, reject) =>
  googleCredentials.get()
    .then((credentials) => {
      const oauth2Client = new google.auth.OAuth2(
        credentials.CLIENT_ID,
        credentials.CLIENT_SECRET,
        // looks like this is a provided fixed URI by Google for local dev
        'urn:ietf:wg:oauth:2.0:oob'
      );

      // check if we saved the token before
      // key names (comes from API request) could change in the future...
      if (credentials.access_token) {
        oauth2Client.setCredentials(credentials);
        resolve(oauth2Client);
        return;
      }

      const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/youtube.readonly',
      });

      console.log(chalk.white.bold('Visit the url:'), url);

      inquirer.prompt({
        type: 'input',
        name: 'OAUTH_TOKEN',
        validate: text => (text && !!text.trim()) || 'Token can\'t be empty',
        message: 'Paste the code from Google:',
      })
        .then(answers =>
          oauth2Client.getToken(answers.OAUTH_TOKEN, (err, tokens) => {
            // use promises, you dumb google!
            if (err) {
              reject(err);
              return;
            }

            googleCredentials.write(Object.assign({}, credentials, tokens), reject);
            oauth2Client.setCredentials(tokens);
            resolve(oauth2Client);
          })
        )
        .catch(err => reject(err));
    })
    .catch(err => reject(err))
);
