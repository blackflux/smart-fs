const assert = require('assert');
const fs = require('fs');
const path = require('path');

module.exports = (filepath, options = {}) => {
  assert(typeof filepath === 'string');
  assert(options instanceof Object && !Array.isArray(options));

  const ctx = {
    exclude: [],
    ...options
  };
  assert(Array.isArray(ctx.exclude));

  const dirname = path.dirname(filepath);
  const basename = path.basename(filepath);
  if (!fs.existsSync(dirname) || !fs.lstatSync(dirname).isDirectory()) {
    return null;
  }
  const relevantFiles = fs
    .readdirSync(dirname)
    .filter((f) => f === basename || (f.startsWith(`${basename}.`) && f.lastIndexOf('.') <= basename.length))
    .filter((f) => !ctx.exclude.includes(f.slice(f.lastIndexOf('.') + 1)));
  if (relevantFiles.includes(basename)) {
    return filepath;
  }
  if (relevantFiles.length === 1) {
    return path.join(dirname, relevantFiles[0]);
  }
  return null;
};
