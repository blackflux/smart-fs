import path from 'path';
import { expect } from 'chai';
import { describe } from 'node-tdd';
import getExt from '../../src/util/get-ext.js';

describe('Testing get-ext.js', () => {
  const executeTest = (filename, expected) => {
    expect(getExt(filename)).to.equal(expected);
    expect(getExt(path.join('/', 'tmp', filename))).to.equal(expected);
  };

  it('Testing base case', () => {
    executeTest('filename.ext', 'ext');
  });

  it('Testing without ext', () => {
    executeTest('filename', '');
  });

  it('Testing with additional dot', () => {
    executeTest('file.name.ext', 'ext');
  });

  it('Testing with short extension', () => {
    executeTest('filename.s', 's');
  });
});
