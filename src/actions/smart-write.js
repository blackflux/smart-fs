const assert = require('assert');
const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const yaml = require('yaml-boost');
const getExt = require('./get-ext');

module.exports = (filepath, content, options = {}) => {
  assert(typeof filepath === 'string');
  assert(content instanceof Object);
  assert(options instanceof Object && !Array.isArray(options));

  const ctx = Object.assign({
    treatAs: null
  }, options);
  assert(Object.keys(ctx).length === 1, 'Unexpected Option provided!');
  assert(ctx.treatAs === null || typeof ctx.treatAs === 'string');

  let contentString;
  switch (ctx.treatAs || getExt(filepath)) {
    case 'yml':
    case 'yaml':
      contentString = yaml.dump(content);
      break;
    case 'json':
      contentString = JSON.stringify(content, null, 2);
      break;
    default:
      assert(Array.isArray(content));
      contentString = content.join('\n');
      break;
  }

  const currentContent = fs.existsSync(filepath) ? fs.readFileSync(filepath, 'utf8') : null;
  if (currentContent !== contentString) {
    fsExtra.ensureDirSync(path.dirname(filepath));
    fs.writeFileSync(filepath, contentString);
    return true;
  }
  return false;
};
