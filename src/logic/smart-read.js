import assert from 'assert';
import fs from 'fs';
import getExt from '../util/get-ext.js';
import smartParse from './smart-parse.js';

export default (filepath, options = {}) => {
  assert(typeof filepath === 'string');
  assert(options instanceof Object && !Array.isArray(options));

  const ctx = { treatAs: null, resolve: true, ...options };
  assert(Object.keys(ctx).length === 2, 'Unexpected Option provided!');
  assert(ctx.treatAs === null || typeof ctx.treatAs === 'string');
  assert(typeof ctx.resolve === 'boolean');

  const treatAs = ctx.treatAs || getExt(filepath);
  if (treatAs === 'js') {
    return import(filepath);
  }

  return smartParse(fs.readFileSync(filepath, 'utf8'), {
    ...ctx,
    refPath: filepath,
    treatAs
  });
};
