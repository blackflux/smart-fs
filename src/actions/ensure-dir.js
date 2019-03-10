const assert = require('assert');
const fs = require('fs');

const isDirectory = (dir) => {
  try {
    const stat = fs.lstatSync(dir);
    return stat.isDirectory();
  } catch (e) {
    return false;
  }
};

module.exports = (dir, options = {}) => {
  assert(typeof dir === 'string');
  assert(options instanceof Object && !Array.isArray(options));

  if (isDirectory(dir)) {
    return false;
  }
  fs.mkdirSync(dir, options);
  return true;
};
