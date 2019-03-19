const expect = require('chai').expect;
const sfs = require('../src/index');


describe('Testing Integration', () => {
  it('Testing Exported Functions', () => {
    expect(Object.keys(sfs)).to.deep.equal([
      'guessFile',
      'walkDir',
      'cleaningDelete',
      'smartRead',
      'smartWrite'
    ]);
  });
});
