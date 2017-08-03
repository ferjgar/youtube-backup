const chalk = require('chalk');

module.exports = {
  print: text => console.log(chalk.green(text)),
  error: text => console.log(chalk.bold.red(text)),
};