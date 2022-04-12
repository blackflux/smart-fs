import fs from 'fs';
import { expect } from 'chai';
import { describe } from 'node-tdd';
import sfs from '../src/index.js';

describe('Testing Integration', () => {
  it('Testing Exported Functions', () => {
    const diff = Object.keys(sfs).filter((k) => sfs[k] !== fs[k]);
    expect(diff).to.deep.equal([
      'dirname',
      'filename',
      'guessFile',
      'walkDir',
      'cleaningDelete',
      'smartParse',
      'smartRead',
      'smartWrite'
    ]);
  });
});
