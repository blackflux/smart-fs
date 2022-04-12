import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { describe } from 'node-tdd';
import smartWrite from '../../src/logic/smart-write.js';
import cleanDelete from '../../src/logic/cleaning-delete.js';

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
