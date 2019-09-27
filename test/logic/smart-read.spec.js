const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const { describe } = require('node-tdd');
const smartRead = require('../../src/logic/smart-read');

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
    executeTest('file.yml', '<<<:\n  - key: value', { key: 'value' });
  });

  it('Testing .yml (no resolve)', () => {
    executeTest('file.yml', '<<<:\n  - key: value', { '<<<': [{ key: 'value' }] }, { resolve: false });
  });

  it('Testing .js', () => {
    executeTest('file.js', "module.exports = {key: 'value'};", { key: 'value' });
  });

  it('Testing .js cache not invalidated', () => {
    executeTest('file.js', "module.exports = {key: 'value'};", { key: 'value' });
    executeTest('file.js', "module.exports = {key: 'other'};", { key: 'value' });
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
