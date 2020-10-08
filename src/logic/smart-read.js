const assert = require('assert');
const fs = require('fs');
const getExt = require('../util/get-ext');
const smartParse = require('./smart-parse');

module.exports = (filepath, options = {}) => {
  assert(typeof filepath === 'string');
  assert(options instanceof Object && !Array.isArray(options));

  const ctx = { treatAs: null, resolve: true, ...options };
  assert(Object.keys(ctx).length === 2, 'Unexpected Option provided!');
  assert(ctx.treatAs === null || typeof ctx.treatAs === 'string');
  assert(typeof ctx.resolve === 'boolean');

  return smartParse(fs.readFileSync(filepath, 'utf8'), {
    ...ctx,
    refPath: filepath,
    treatAs: ctx.treatAs || getExt(filepath)
  });
};
