const assert = require('assert');
const fs = require('fs');
const yaml = require('yaml-boost');
const xmlParser = require('../util/xml-parser');
const getExt = require('../util/get-ext');


module.exports = (filepath, options = {}) => {
  assert(typeof filepath === 'string');
  assert(options instanceof Object && !Array.isArray(options));

  const ctx = { treatAs: null, ...options };
  assert(Object.keys(ctx).length === 1, 'Unexpected Option provided!');
  assert(ctx.treatAs === null || typeof ctx.treatAs === 'string');

  let result;
  switch (ctx.treatAs || getExt(filepath)) {
    case 'json':
      result = JSON.parse(fs.readFileSync(filepath, 'utf8'));
      break;
    case 'xml':
      result = xmlParser.parse(fs.readFileSync(filepath, 'utf8'), options);
      break;
    case 'yml':
    case 'yaml':
      result = yaml.load(filepath, {});
      break;
    case 'js':
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
