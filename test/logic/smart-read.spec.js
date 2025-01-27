import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { describe } from 'node-tdd';
import smartRead from '../../src/logic/smart-read.js';

describe('Testing smartRead', { useTmpDir: true }, () => {
  let tmpDir;

  beforeEach(({ dir }) => {
    tmpDir = dir;
  });

  const executeTest = (filename, content, expected, options) => {
    const filepath = path.join(tmpDir, filename);
    fs.writeFileSync(filepath, content, 'utf8');
    expect(smartRead(filepath, options)).to.deep.equal(expected);
  };

  const executeTestAsync = async (filename, content, expected, options) => {
    const filepath = path.join(tmpDir, filename);
    const pkgpath = path.join(tmpDir, 'package.json');
    fs.writeFileSync(filepath, content, 'utf8');
    fs.writeFileSync(pkgpath, '{ "type": "module" }', 'utf8');
    const r = await smartRead(filepath, options);
    expect(r).to.deep.equal(expected);
  };

  it('Testing .json', () => {
    executeTest('file.json', '{"key":"value"}', { key: 'value' });
  });

  it('Testing .xml', () => {
    executeTest(
      'file.xml',
      '<key>value</key>',
      {
        data: {
          elements: [
            {
              elements: [
                {
                  text: 'value',
                  type: 'text'
                }
              ],
              name: 'key',
              type: 'element'
            }
          ]
        },
        meta: { spaceSelfClosing: false }
      }
    );
  });

  it('Testing .yml (resolve)', () => {
    executeTestAsync('file.yml', '<<<:\n  - key: value', { key: 'value' });
  });

  it('Testing .yml (no resolve)', () => {
    executeTest('file.yml', '<<<:\n  - key: value', { '<<<': [{ key: 'value' }] }, { resolve: false });
  });

  it('Testing .js', async () => {
    await executeTestAsync('file.js', "export default {key: 'value'};", { key: 'value' });
  });

  it('Testing .js cache not invalidated', async () => {
    await executeTestAsync('file.js', "export default {key: 'value'};", { key: 'value' });
    await executeTestAsync('file.js', "export default {key: 'other'};", { key: 'value' });
  });

  it('Testing default', () => {
    executeTest('file.txt', 'line1\nline2', ['line1', 'line2']);
  });

  it('Testing postfix empty line', () => {
    executeTest('file.txt', 'line1\nline2\n', ['line1', 'line2']);
  });

  it('Testing treatAs', () => {
    executeTest('file.txt', '{"key":"value"}', { key: 'value' }, { treatAs: 'json' });
  });
});
