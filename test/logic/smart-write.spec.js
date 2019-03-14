const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const tmp = require('tmp');
const smartWrite = require('../../src/logic/smart-write');

describe('Testing smartWrite', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  const executeTest = (filename, content, expected, options) => {
    const filepath = path.join(dir, filename);
    smartWrite(filepath, content, options);
    expect(fs.readFileSync(filepath, 'utf8')).to.equal(expected);
  };

  it('Testing .json', () => {
    executeTest('file.json', { key: 'value' }, '{\n  "key": "value"\n}\n');
  });

  it('Testing .xml', () => {
    executeTest(
      'file.xml',
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
        meta: {
          spaceSelfClosing: false,
          spaces: 0
        }
      },
      '<key>value</key>\n'
    );
  });

  it('Testing .xml (compact)', () => {
    executeTest(
      'file.xml',
      {
        data: { key: { _text: 'value' } },
        meta: { spaceSelfClosing: false, spaces: 0 }
      },
      '<key>value</key>\n',
      { compact: true }
    );
  });

  it('Testing .yml', () => {
    executeTest('file.yml', { key: 'value' }, 'key: value\n');
  });

  it('Testing default', () => {
    executeTest('file.txt', ['line1', 'line2'], 'line1\nline2\n');
  });

  it('Testing treatAs', () => {
    executeTest('file.txt', { key: 'value' }, '{\n  "key": "value"\n}\n', { treatAs: 'json' });
  });

  it('Testing unchanged content', () => {
    executeTest('file.txt', ['line1', 'line2'], 'line1\nline2\n');
    executeTest('file.txt', ['line1', 'line2'], 'line1\nline2\n');
  });

  it('Testing custom merge strategy', () => {
    executeTest('file.json', { key: 'value' }, '{\n  "key": "value"\n}\n');
    executeTest(
      'file.json',
      { other: 'value' },
      '{\n  "key": "value",\n  "other": "value"\n}\n',
      { mergeStrategy: (existing, changeset) => Object.assign(existing, changeset) }
    );
  });
});
