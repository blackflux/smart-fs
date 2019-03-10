const expect = require('chai').expect;
const tmp = require('tmp');
const sfs = require('../src/index');


describe('Testing Integration', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  it('Testing Exported Functions', () => {
    expect(Object.keys(sfs)).to.deep.equal(['getExt', 'ensureDir']);
  });
});
