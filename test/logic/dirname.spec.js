const expect = require('chai').expect;
const { describe } = require('node-tdd');
const dirname = require('../../src/logic/dirname');

describe('Testing dirname', () => {
  it('Testing transforamtion', () => {
    expect(dirname('file:///home/user/my-module.js')).to.equal('/home/user');
  });
});
