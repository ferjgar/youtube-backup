const chalk = require('chalk');
const fs = require('fs');

module.exports.out = {
  print: text => console.log(chalk.blue(text)),
  success: text => console.log(chalk.green(text)),
  error: text => console.log(chalk.bold.red(text)),
};

module.exports.writeJSON = (filePath, json, reject) =>
  fs.writeFile(filePath, JSON.stringify(json), { mode: '0600' }, (err) => {
    if (err) {
      // who knows, just send it back
      reject(err);
    }
  });
