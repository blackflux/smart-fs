import assert from 'assert';
import yamlBoost from 'yaml-boost';
import yaml from 'js-yaml';
import getExt from '../util/get-ext.js';
import * as xmlParser from '../util/xml-parser.js';

export default (content, options = {}) => {
  assert(typeof content === 'string');
  assert(options instanceof Object && !Array.isArray(options));

  const ctx = {
    treatAs: null,
    resolve: true,
    refPath: process.cwd(),
    ...options
  };
  assert(Object.keys(ctx).length === 3, 'Unexpected Option provided!');
  assert(ctx.treatAs === null || typeof ctx.treatAs === 'string');
  assert(typeof ctx.resolve === 'boolean');
  assert(typeof ctx.refPath === 'string');

  let result;
  switch (ctx.treatAs || getExt(ctx.refPath)) {
    case 'json':
      result = JSON.parse(content);
      break;
    case 'xml':
      result = xmlParser.parse(content);
      break;
    case 'yml':
    case 'yaml':
      result = ctx.resolve
        ? yamlBoost.resolve(ctx.refPath, content, {})
        : yaml.load(content);
      break;
    default:
      result = content.split('\n');
      if (result[result.length - 1].trim() === '') {
        result.pop();
      }
      break;
  }
  return result;
};
