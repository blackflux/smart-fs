const assert = require('assert');
const fs = require('fs');
const path = require('path');
const isEqual = require('lodash.isequal');
const cloneDeep = require('lodash.clonedeep');
const fsExtra = require('fs-extra');
const yaml = require('yaml-boost');
const smartRead = require('./smart-read');
const xmlParser = require('../util/xml-parser');
const getExt = require('../util/get-ext');

module.exports = (filepath, content, options = {}) => {
  assert(typeof filepath === 'string');
  assert(content instanceof Object);
  assert(options instanceof Object && !Array.isArray(options));

  const ctx = Object.assign({
    mergeStrategy: (existing, changeset) => changeset,
    create: true,
    treatAs: null
  }, options);
  assert(Object.keys(ctx).length === 3, 'Unexpected Option provided!');
  assert(ctx.treatAs === null || typeof ctx.treatAs === 'string');
  assert(typeof ctx.mergeStrategy === 'function');
  assert(typeof ctx.create === 'boolean');

  const targetExists = fs.existsSync(filepath);
  if (ctx.create !== true && !targetExists) {
    return false;
  }

  const ext = getExt(filepath);
  const currentContent = targetExists
    ? smartRead(filepath, {
      treatAs: ctx.treatAs === null && ext === 'js' ? 'txt' : ctx.treatAs
    })
    : null;

  const mergedContent = currentContent == null
    ? content
    : ctx.mergeStrategy(cloneDeep(currentContent), cloneDeep(content));

  if (!isEqual(currentContent, mergedContent)) {
    fsExtra.ensureDirSync(path.dirname(filepath));
    let contentString;
    switch (ctx.treatAs || ext) {
      case 'yml':
      case 'yaml':
        contentString = yaml.dump(mergedContent);
        break;
      case 'xml':
        contentString = xmlParser.stringify(mergedContent, options);
        break;
      case 'json':
        contentString = `${JSON.stringify(mergedContent, null, 2)}\n`;
        break;
      default:
        assert(Array.isArray(mergedContent));
        contentString = `${mergedContent.join('\n')}\n`;
        break;
    }
    fs.writeFileSync(filepath, contentString);
    return true;
  }
  return false;
};
