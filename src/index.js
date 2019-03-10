const assert = require('assert');
const path = require('path');

const getExt = (filename) => {
  assert(typeof filename === 'string');
  return path.extname(filename).slice(1);
};
module.exports.getExt = getExt;
