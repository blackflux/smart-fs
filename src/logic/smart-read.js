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

  let result;
  switch (ctx.treatAs || getExt(filepath)) {
    case 'json':
      result = JSON.parse(fs.readFileSync(filepath, 'utf8'));
      break;
    case 'yml':
    case 'yaml':
      result = yaml.load(filepath, {});
      break;
    case 'js':
      // ensure content is "fresh"
      delete require.cache[require.resolve(filepath)];
      // eslint-disable-next-line import/no-dynamic-require,global-require
      result = require(filepath);
      break;
    default:
      result = fs.readFileSync(filepath, 'utf8').split('\n');
      if (result[result.length - 1].trim() === '') {
        result.pop();
      }
      break;
  }
  return result;
};
