import { expect } from 'chai';
import { describe } from 'node-tdd';
import dirname from '../../src/logic/dirname.js';

describe('Testing dirname', () => {
  it('Testing transforamtion', () => {
    expect(dirname('file:///home/user/my-module.js')).to.equal('/home/user');
  });
});
