const google = require('googleapis');
const inquirer = require('inquirer');
const chalk = require('chalk');

const googleCredentials = require('./google_credentials');

module.exports.get = () => new Promise((resolve, reject) => {
  googleCredentials.get()
    .then((credentials) => {
      // check if we saved it before
      if (credentials.OAUTH_TOKEN) {
        resolve(credentials.OAUTH_TOKEN);
        return;
      }

      const oauth2Client = new google.auth.OAuth2(
        credentials.CLIENT_ID,
        credentials.CLIENT_SECRET,
        // looks like this is a provided fixed URI by Google for local dev
        'urn:ietf:wg:oauth:2.0:oob'
      );

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
        .then((answers) => {
          googleCredentials.write(
            Object.assign({}, credentials, { OAUTH_TOKEN: answers.OAUTH_TOKEN }),
            reject
          );
          resolve(answers.OAUTH_TOKEN);
        })
        .catch(err => reject(err));
    })
    .catch(err => reject(err));
});
