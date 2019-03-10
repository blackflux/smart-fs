const assert = require('assert');
const fs = require('fs');
const path = require('path');
const isEqual = require('lodash.isequal');
const cloneDeep = require('lodash.clonedeep');
const fsExtra = require('fs-extra');
const yaml = require('yaml-boost');
const smartRead = require('./smart-read');
const getExt = require('./get-ext');

module.exports = (filepath, content, options = {}) => {
  assert(typeof filepath === 'string');
  assert(content instanceof Object);
  assert(options instanceof Object && !Array.isArray(options));

  const ctx = Object.assign({
    treatAs: null,
    mergeStrategy: (existing, changeset) => changeset
  }, options);
  assert(Object.keys(ctx).length === 2, 'Unexpected Option provided!');
  assert(ctx.treatAs === null || typeof ctx.treatAs === 'string');
  assert(typeof ctx.mergeStrategy === 'function');

  const currentContent = fs.existsSync(filepath)
    ? smartRead(filepath, { treatAs: ctx.treatAs })
    : null;

  const mergedContent = currentContent == null
    ? content
    : ctx.mergeStrategy(cloneDeep(currentContent), cloneDeep(content));

  if (!isEqual(currentContent, mergedContent)) {
    fsExtra.ensureDirSync(path.dirname(filepath));
    let contentString;
    switch (ctx.treatAs || getExt(filepath)) {
      case 'yml':
      case 'yaml':
        contentString = yaml.dump(mergedContent);
        break;
      case 'json':
        contentString = JSON.stringify(mergedContent, null, 2);
        break;
      default:
        assert(Array.isArray(mergedContent));
        contentString = mergedContent.join('\n');
        break;
    }
    fs.writeFileSync(filepath, contentString);
    return true;
  }
  return false;
};
