const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

module.exports.out = {
  print: text => console.log(chalk.blue(text)),
  success: text => console.log(chalk.green(text)),
  error: text => console.log(chalk.bold.red(text)),
};

module.exports.writeJSON = (filePath, data, reject) => {
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath));
  }

  fs.writeFile(filePath, JSON.stringify(data), { mode: '0600' }, (err) => {
    if (err) {
      // who knows what happened, just send it back
      reject(err);
    }
  });
};
