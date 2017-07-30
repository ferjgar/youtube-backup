const os = require('os');
const fs = require('fs');
const inquirer = require('inquirer');

const CREDENTIALS_PATH = `${os.homedir()}/.googleapi`;

module.exports.get = () => new Promise((resolve, reject) =>
  fs.readFile(CREDENTIALS_PATH, 'utf8', (errReading, data) => {
    const test = errReading
      ? // not found, can't read... who cares
      inquirer.prompt([{
        type: 'input',
        name: 'CLIENT_ID',
        validate: text => (text && !!text.trim()) || 'Cliend id can\'t be empty',
        message: 'Looks like we don´t have your google api credentials, please paste the client id:',
      }, {
        type: 'input',
        name: 'CLIENT_SECRET',
        validate: text => (text && !!text.trim()) || 'Cliend secret can\'t be empty',
        message: 'please paste the client secret:',
      }]).then((answers) => {
        fs.writeFile(CREDENTIALS_PATH, JSON.stringify(answers), { mode: 600 }, (err) => {
          if (err) {
            // who knows, just exit
            reject(err);
          }
        });
        return answers;
      })
      : data;
    resolve(test);
  })
);
