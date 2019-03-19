const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const tmp = require('tmp');
const smartWrite = require('../../src/logic/smart-write');
const cleanDelete = require('../../src/logic/cleaning-delete');

describe('Testing cleanDelete', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  it('Testing empty nested folder delete', () => {
    const filepath = path.join(dir, 'abc', 'def', 'file1.txt');
    smartWrite(filepath, ['']);
    smartWrite(path.join(dir, 'file2.txt'), ['']);
    expect(fs.readdirSync(dir)).to.deep.equal(['abc', 'file2.txt']);
    cleanDelete(filepath);
    expect(fs.readdirSync(dir)).to.deep.equal(['file2.txt']);
  });

  it('Testing file not exist rethrow', () => {
    expect(() => cleanDelete(path.join(dir, 'unknown.txt')))
      .to.throw('ENOENT: no such file or directory');
  });
});
