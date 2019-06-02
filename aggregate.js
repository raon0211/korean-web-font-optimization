const fs = require('fs');
const path = require('path');
const concat = require('concat');
const rimraf = require('rimraf');

async function aggregateCSSFiles(dir, dest) {
  const filePaths = getCSSFilePaths(dir);
  const result = await concat(filePaths);

  await removeIntermediateCSSFiles(dir);
  fs.writeFileSync(dest, result);
}

module.exports = aggregateCSSFiles;

function getCSSFilePaths(dir) {
  return fs
    .readdirSync(dir)
    .map(fileName => path.join(dir, fileName))
    .filter(filePath => {
      if (!fs.statSync(filePath).isFile()) {
        return false;
      }

      return /\.css$/.test(filePath);
    });
}

async function removeIntermediateCSSFiles(dir) {
  return await new Promise(resolve => {
    rimraf(path.join(dir, '**', '*.css'), resolve);
  });
}
