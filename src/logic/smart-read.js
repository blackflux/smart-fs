const assert = require('assert');
const fs = require('fs');
const yaml = require('yaml-boost');
const getExt = require('./get-ext');


module.exports = (filepath, options = {}) => {
  assert(typeof filepath === 'string');
  assert(options instanceof Object && !Array.isArray(options));

  const ctx = Object.assign({
    treatAs: null
  }, options);
  assert(Object.keys(ctx).length === 1, 'Unexpected Option provided!');
  assert(ctx.treatAs === null || typeof ctx.treatAs === 'string');

  switch (ctx.treatAs || getExt(filepath)) {
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
