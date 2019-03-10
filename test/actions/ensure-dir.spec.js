const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const tmp = require('tmp');
const ensureDir = require('../../src/actions/ensure-dir');

describe('Testing ensureDir', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  it('Testing dir creation', () => {
    expect(ensureDir(path.join(dir, 'dir'))).to.equal(true);
    expect(ensureDir(path.join(dir, 'dir'))).to.equal(false);
  });

  it('Testing nested dir creation', () => {
    expect(ensureDir(path.join(dir, 'dir', 'dir'), { recursive: true })).to.equal(true);
    expect(ensureDir(path.join(dir, 'dir', 'dir'), { recursive: true })).to.equal(false);
  });

  it('Testing nested dir creation fails', () => {
    try {
      ensureDir(path.join(dir, 'dir', 'dir'));
    } catch (e) {
      expect(e.code).to.equal('ENOENT');
    }
  });

  it('Testing file in dir location', () => {
    const filepath = path.join(dir, 'file');
    fs.writeFileSync(filepath, '');
    try {
      ensureDir(filepath);
    } catch (e) {
      expect(e.code).to.equal('EEXIST');
    }
  });
});
