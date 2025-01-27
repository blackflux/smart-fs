import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { describe } from 'node-tdd';
import walkDir from '../../src/logic/walk-dir.js';
import smartWrite from '../../src/logic/smart-write.js';

describe('Testing walkDir', { useTmpDir: true }, () => {
  let tmpDir;

  beforeEach(({ dir }) => {
    tmpDir = dir;
  });

  const executeTest = (files) => {
    files.forEach((f) => smartWrite(path.join(tmpDir, f), []));
    expect(walkDir(tmpDir)).to.deep.equal(files);
  };

  it('Testing nested files', () => {
    executeTest(['file1', 'dir/subdir/file3', 'dir/file2']);
  });

  it('Testing excluding symlink', () => {
    fs.symlinkSync(tmpDir, path.join(tmpDir, 'link'));
    executeTest([]);
  });
});
