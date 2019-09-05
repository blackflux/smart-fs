const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const { describe } = require('node-tdd');
const xmlParser = require('../../src/util/xml-parser');

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
