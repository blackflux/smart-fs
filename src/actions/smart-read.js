const assert = require('assert');
const fs = require('fs');
const yaml = require('yaml-boost');
const getExt = require('./get-ext');


module.exports = (filepath) => {
  assert(typeof filepath === 'string');

  switch (getExt(filepath)) {
    case 'json':
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    case 'yml':
    case 'yaml':
      return yaml.load(filepath, {});
    case 'js':
      // ensure content is "fresh"
      delete require.cache[require.resolve(filepath)];
      // eslint-disable-next-line import/no-dynamic-require,global-require
      return require(filepath);
    default:
      return fs.readFileSync(filepath, 'utf8').split('\n');
  }
};
