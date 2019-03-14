const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const xmlParser = require('../../src/util/xml-parser');

describe('Testing xml-parser.js', () => {
  const executeTest = (filename) => {
    const content = fs.readFileSync(filename, 'utf8');
    const parsed = xmlParser.parse(content, { compact: false });
    const stringified = xmlParser.stringify(parsed, { compact: false });
    expect(content).to.equal(stringified);
  };

  fs.readdirSync(path.join(__dirname, 'xml-parser')).forEach((f) => {
    it(`Testing ${f}`, () => {
      executeTest(path.join(__dirname, 'xml-parser', f));
    });
  });
});
