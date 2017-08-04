const { spawn } = require('child_process');

const { print } = require('./output');

module.exports.download = (videoId, dirPath) => new Promise((resolve, reject) => {
  print(`Downloading video ${videoId}`);

  const download = spawn(
    'youtube-dl',
    ['-f mp4', `--output ${dirPath}/${videoId}.mp4`, videoId],
    // I have literally no idea why this needs the below option in order to work
    // expect a lot of weirdness with child_process.spawn
    { shell: true }
  );

  download.on('close', exitCode => (exitCode
    ? reject(new Error(`Error downloading video ${videoId}`))
    : resolve(`DOWNLOADED video ${videoId}`)
  ));

  download.on('error', err => reject(err));
});
