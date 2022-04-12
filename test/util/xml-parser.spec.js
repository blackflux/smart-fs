import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { describe } from 'node-tdd';
import * as xmlParser from '../../src/util/xml-parser.js';

describe('Testing xml-parser.js', () => {
  const executeTest = (filename) => {
    const content = fs.readFileSync(filename, 'utf8');
    const parsed = xmlParser.parse(content);
    const stringified = xmlParser.stringify(parsed);
    expect(content).to.equal(stringified);
  };

  // eslint-disable-next-line mocha/no-setup-in-describe
  fs.readdirSync(path.join(__dirname, 'xml-parser')).forEach((f) => {
    it(`Testing ${f}`, () => {
      executeTest(path.join(__dirname, 'xml-parser', f));
    });
  });
});
