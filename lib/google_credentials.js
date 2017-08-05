const os = require('os');
const fs = require('fs');
const inquirer = require('inquirer');

const { writeJSON } = require('./util');

const CREDENTIALS_PATH = `${os.homedir()}/.googleapi`;

const write = (json, reject) => writeJSON(CREDENTIALS_PATH, JSON.stringify(json), reject);

const get = () => new Promise((resolve, reject) =>
  fs.readFile(CREDENTIALS_PATH, 'utf8', (errReading, data) =>
    resolve(errReading
      ? // not found, can't read... who cares
      inquirer.prompt([{
        type: 'input',
        name: 'CLIENT_ID',
        validate: text => (text && !!text.trim()) || 'Client id can\'t be empty',
        message: 'Paste your Google API client id:',
      }, {
        type: 'input',
        name: 'CLIENT_SECRET',
        validate: text => (text && !!text.trim()) || 'Client secret can\'t be empty',
        message: 'Paste your Google API client secret:',
      }]).then((answers) => {
        write(JSON.stringify(answers), reject);
        return answers;
      })
      : JSON.parse(data)
    )
  )
);

module.exports = {
  get,
  write,
};
