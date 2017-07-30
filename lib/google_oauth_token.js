const google = require('googleapis');
const inquirer = require('inquirer');
const chalk = require('chalk');

module.exports.get = credentials => new Promise((resolve, reject) => {
  const oauth2Client = new google.auth.OAuth2(
    credentials.CLIENT_ID,
    credentials.CLIENT_SECRET,
    'urn:ietf:wg:oauth:2.0:oob'
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
  });

  console.log(chalk.blue.bold('Visit the url:'), url);

  inquirer.prompt({
    type: 'input',
    name: 'token',
    validate: text => (text && !!text.trim()) || 'Token can\'t be empty',
    message: 'Paste the code from Google:',
  })
    .then(answers => resolve(answers.token))
    .catch(err => reject(err));
});
