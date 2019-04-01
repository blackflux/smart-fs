const fs = require('fs');
const path = require('path');

module.exports = (filepath) => {
  const dirname = path.dirname(filepath);
  const basename = path.basename(filepath);
  if (!fs.existsSync(dirname) || !fs.lstatSync(dirname).isDirectory()) {
    return null;
  }
  const relevantFiles = fs
    .readdirSync(dirname)
    .filter(f => f === basename || (f.startsWith(`${basename}.`) && f.lastIndexOf('.') <= basename.length));
  if (relevantFiles.includes(basename)) {
    return filepath;
  }
  if (relevantFiles.length === 1) {
    return path.join(dirname, relevantFiles[0]);
  }
  return null;
};
