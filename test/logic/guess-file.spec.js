const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const tmp = require('tmp');
const guessFile = require('../../src/logic/guess-file');

describe('Testing guessFile', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  const executeTest = (files, input, expected) => {
    files.forEach(f => fs.writeFileSync(path.join(dir, f), ''));
    const filepath = path.join(dir, input);
    expect(guessFile(filepath)).to.equal(typeof expected === 'string' ? path.join(dir, expected) : expected);
  };

  it('Testing exact multi-match', () => {
    executeTest(['file', 'file.json'], 'file', 'file');
  });

  it('Testing partial match', () => {
    executeTest(['file.json'], 'file', 'file.json');
  });

  it('Testing partial non-match', () => {
    const files = ['file.json'];
    executeTest(files, 'fil', null);
    executeTest(files, 'file.', null);
    executeTest(files, 'file.j', null);
  });

  it('Testing partial multi non-match', () => {
    executeTest(['file.json', 'file.yml'], 'file', null);
  });

  it('Testing double extension', () => {
    executeTest(['file.json.json'], 'file', null);
    executeTest(['file..json'], 'file', null);
  });
});
