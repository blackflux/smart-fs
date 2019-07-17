const fs = require('fs');
const expect = require('chai').expect;
const sfs = require('../src/index');


describe('Testing Integration', () => {
  it('Testing Exported Functions', () => {
    const diff = Object.keys(sfs).filter(k => !Object.keys(fs).includes(k));
    expect(diff).to.deep.equal([
      'guessFile',
      'walkDir',
      'cleaningDelete',
      'smartRead',
      'smartWrite'
    ]);
  });
});
