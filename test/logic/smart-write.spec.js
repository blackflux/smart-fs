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

  it('Testing .json (pretty)', () => {
    executeTest('file.json', { key: 'value' }, '{"key": "value"}\n', { pretty: true });
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
        meta: { spaceSelfClosing: false }
      },
      '<key>value</key>'
    );
  });

  it('Testing .yml', () => {
    executeTest('file.yml', { key: 'value' }, 'key: value\n');
  });

  it('Testing .js rewrite', () => {
    const opt = {
      mergeStrategy: (existing, changeset) => existing.concat(changeset)
    };
    executeTest(
      'file.js',
      ['module.exports.a = "a";'],
      'module.exports.a = "a";\n',
      opt
    );
    executeTest(
      'file.js',
      ['module.exports.b = "b";'],
      'module.exports.a = "a";\nmodule.exports.b = "b";\n',
      opt
    );
  });

  it('Testing default', () => {
    executeTest('file.txt', ['line1', 'line2'], 'line1\nline2\n');
  });

  it('Testing create=false', () => {
    expect(smartWrite(path.join(dir, 'file1.txt'), ['line1'], { create: false }))
      .to.equal(false);
  });

  it('Testing treatAs', () => {
    executeTest('file.txt', { key: 'value' }, '{\n  "key": "value"\n}\n', { treatAs: 'json' });
  });

  it('Testing keepOrder', () => {
    expect(smartWrite(path.join(dir, 'f.json'), { k1: 'v1', k2: 'v2', x: 1 })).to.equal(true);
    expect(fs.readFileSync(path.join(dir, 'f.json'), 'utf8'))
      .to.deep.equal('{\n  "k1": "v1",\n  "k2": "v2",\n  "x": 1\n}\n');
    expect(smartWrite(path.join(dir, 'f.json'), { k2: 'v2', k1: 'v1', x: 2 })).to.equal(true);
    expect(fs.readFileSync(path.join(dir, 'f.json'), 'utf8'))
      .to.deep.equal('{\n  "k1": "v1",\n  "k2": "v2",\n  "x": 2\n}\n');
    expect(smartWrite(path.join(dir, 'f.json'), { k2: 'v1', k1: 'v2', x: 3 }, { keepOrder: false })).to.equal(true);
    expect(fs.readFileSync(path.join(dir, 'f.json'), 'utf8'))
      .to.deep.equal('{\n  "k2": "v1",\n  "k1": "v2",\n  "x": 3\n}\n');
  });

  it('Testing treatAs null', () => {
    executeTest('file.txt', ['line1', 'line2'], 'line1\nline2\n', { treatAs: null });
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
