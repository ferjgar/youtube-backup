const pug = require('pug');
const fs = require('fs');

module.exports.playlist = (htmlPath) => {
  const html = pug.renderFile(`${__dirname}/tpl/playlist.pug`);
  fs.writeFileSync(htmlPath, html);
};
