const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const tmp = require('tmp');
const walkDir = require('../../src/logic/walk-dir');
const smartWrite = require('../../src/logic/smart-write');

describe('Testing walkDir', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  const executeTest = (files) => {
    files.forEach((f) => smartWrite(path.join(dir, f), []));
    expect(walkDir(dir)).to.deep.equal(files);
  };

  it('Testing nested files', () => {
    executeTest(['file1', 'dir/subdir/file3', 'dir/file2']);
  });

  it('Testing excluding symlink', () => {
    fs.symlinkSync(dir, path.join(dir, 'link'));
    executeTest([]);
  });
});
