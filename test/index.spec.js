const expect = require('chai').expect;
const sfs = require('../src/index');


describe('Testing Functionality', () => {
  it('Testing getExt', () => {
    expect(sfs.getExt('data.json')).to.equal('json');
    expect(sfs.getExt('/tmp/data.json')).to.equal('json');
  });
});
