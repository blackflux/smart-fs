import assert from 'assert';
import fs from 'fs';
import getExt from '../util/get-ext.js';
import smartParse from './smart-parse.js';

// todo: use this when node 20 is deprecated
// import { createRequire } from 'module';
// const requireRaw = createRequire(import.meta.url);
// const requireEsm = (arg) => {
//   const result = requireRaw(arg);
//   return 'default' in result ? result.default : result;
// };

export default (filepath, options = {}) => {
  assert(typeof filepath === 'string');
  assert(options instanceof Object && !Array.isArray(options));

  const ctx = { treatAs: null, resolve: true, ...options };
  assert(Object.keys(ctx).length === 2, 'Unexpected Option provided!');
  assert(ctx.treatAs === null || typeof ctx.treatAs === 'string');
  assert(typeof ctx.resolve === 'boolean');

  const treatAs = ctx.treatAs || getExt(filepath);
  if (treatAs === 'js') {
    return import(filepath).then((m) => m.default);
  }

  return smartParse(fs.readFileSync(filepath, 'utf8'), {
    ...ctx,
    refPath: filepath,
    treatAs
  });
};
