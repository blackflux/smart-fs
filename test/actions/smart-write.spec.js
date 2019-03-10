const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const tmp = require('tmp');
const smartWrite = require('../../src/actions/smart-write');

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
    executeTest('file.json', { key: 'value' }, '{\n  "key": "value"\n}');
  });

  it('Testing .yml', () => {
    executeTest('file.yml', { key: 'value' }, 'key: value\n');
  });

  it('Testing default', () => {
    executeTest('file.txt', ['line1', 'line2'], 'line1\nline2');
  });

  it('Testing treatAs', () => {
    executeTest('file.txt', { key: 'value' }, '{\n  "key": "value"\n}', { treatAs: 'json' });
  });

  it('Testing unchanged content', () => {
    executeTest('file.txt', ['line1', 'line2'], 'line1\nline2');
    executeTest('file.txt', ['line1', 'line2'], 'line1\nline2');
  });

  it('Testing custom merge strategy', () => {
    executeTest('file.json', { key: 'value' }, '{\n  "key": "value"\n}');
    executeTest(
      'file.json',
      { other: 'value' },
      '{\n  "key": "value",\n  "other": "value"\n}',
      { mergeStrategy: (existing, changeset) => Object.assign(existing, changeset) }
    );
  });
});
