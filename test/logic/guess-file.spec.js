import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { describe } from 'node-tdd';
import guessFile from '../../src/logic/guess-file.js';

describe('Testing guessFile', { useTmpDir: true }, () => {
  let tmpDir;
  beforeEach(({ dir }) => {
    tmpDir = dir;
  });

  const executeTest = (files, input, expected, opts = undefined) => {
    files.forEach((f) => fs.writeFileSync(path.join(tmpDir, f), ''));
    const filepath = path.join(tmpDir, input);
    expect(guessFile(filepath, opts)).to.equal(typeof expected === 'string' ? path.join(tmpDir, expected) : expected);
  };

  it('Testing exact multi-match', () => {
    executeTest(['file', 'file.json'], 'file', 'file');
  });

  it('Testing partial match', () => {
    executeTest(['file.json'], 'file', 'file.json');
  });

  it('Testing partial non-match', () => {
    const files = ['file.json'];
    executeTest(files, 'fil', null);
    executeTest(files, 'file.', null);
    executeTest(files, 'file.j', null);
  });

  it('Testing partial multi non-match', () => {
    executeTest(['file.json', 'file.yml'], 'file', null);
  });

  it('Testing partial multi but exclude has match', () => {
    executeTest(['file.json', 'file.yml'], 'file', 'file.json', { exclude: ['yml'] });
  });

  it('Testing double extension', () => {
    executeTest(['file.json.json'], 'file', null);
    executeTest(['file..json'], 'file', null);
  });

  it('Testing parent folder missing', () => {
    executeTest([], 'folder/file', null);
    executeTest(['folder'], 'folder/file', null);
  });
});
