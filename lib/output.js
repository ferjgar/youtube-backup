const chalk = require('chalk');

module.exports = {
  print: text => console.log(chalk.green(text)),
  error: text => console.log(chalk.bold.red(text)),
  info: text => console.log(chalk.blue(text)),
};
