const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const { describe } = require('node-tdd');
const smartWrite = require('../../src/logic/smart-write');
const cleanDelete = require('../../src/logic/cleaning-delete');

describe('Testing cleanDelete', { useTmpDir: true }, () => {
  it('Testing empty nested folder delete', ({ dir }) => {
    const filepath = path.join(dir, 'abc', 'def', 'file1.txt');
    smartWrite(filepath, ['']);
    smartWrite(path.join(dir, 'file2.txt'), ['']);
    expect(fs.readdirSync(dir)).to.deep.equal(['abc', 'file2.txt']);
    cleanDelete(filepath);
    expect(fs.readdirSync(dir)).to.deep.equal(['file2.txt']);
  });

  it('Testing file not exist rethrow', ({ dir }) => {
    expect(() => cleanDelete(path.join(dir, 'unknown.txt')))
      .to.throw('ENOENT: no such file or directory');
  });
});
