import assert from 'assert';
import fs from 'fs';
import path from 'path';
import isEqual from 'lodash.isequal';
import cloneDeep from 'lodash.clonedeep';
import fsExtra from 'fs-extra';
import stringify from 'json-stringify-pretty-compact';
import yaml from 'yaml-boost';
import { align } from 'object-lib';
import smartRead from './smart-read.js';
import * as xmlParser from '../util/xml-parser.js';
import getExt from '../util/get-ext.js';

 export default (filepath, content, options = {}) => {
  assert(typeof filepath === 'string');
  assert(content instanceof Object);
  assert(options instanceof Object && !Array.isArray(options));

  const ctx = {
    treatAs: null,
    mergeStrategy: (existing, changeset) => changeset,
    create: true,
    pretty: false,
    keepOrder: true,
    resolve: false,
    ...options
  };
  assert(Object.keys(ctx).length === 6, 'Unexpected Option provided!');
  assert(ctx.treatAs === null || typeof ctx.treatAs === 'string');
  assert(typeof ctx.mergeStrategy === 'function');
  assert(typeof ctx.create === 'boolean');
  assert(typeof ctx.pretty === 'boolean');
  assert(typeof ctx.keepOrder === 'boolean');
  assert(typeof ctx.resolve === 'boolean');

  const targetExists = fs.existsSync(filepath);
  if (ctx.create !== true && !targetExists) {
    return false;
  }

  const ext = getExt(filepath);
  const currentContent = targetExists
    ? smartRead(filepath, {
      treatAs: ctx.treatAs === null && ext === 'js' ? 'txt' : ctx.treatAs,
      resolve: ctx.resolve
    })
    : null;

  const mergedContent = currentContent == null
    ? content
    : ctx.mergeStrategy(cloneDeep(currentContent), cloneDeep(content));

  if (!isEqual(currentContent, mergedContent)) {
    fsExtra.ensureDirSync(path.dirname(filepath));
    if (ctx.keepOrder) {
      align(mergedContent, currentContent);
    }
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
        contentString = `${ctx.pretty
          ? stringify(mergedContent)
          : JSON.stringify(mergedContent, null, 2)}\n`;
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
