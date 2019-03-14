const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const tmp = require('tmp');
const smartRead = require('../../src/logic/smart-read');

describe('Testing smartRead', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  const executeTest = (filename, content, expected, options) => {
    const filepath = path.join(dir, filename);
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

  it('Testing .yml', () => {
    executeTest('file.yml', 'key: value', { key: 'value' });
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
