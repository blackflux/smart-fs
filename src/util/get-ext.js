const assert = require('assert');
const path = require('path');

module.exports = (filename) => {
  assert(typeof filename === 'string');
  return path.extname(filename).slice(1);
};
