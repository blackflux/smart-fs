const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const { describe } = require('node-tdd');
const walkDir = require('../../src/logic/walk-dir');
const smartWrite = require('../../src/logic/smart-write');

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
