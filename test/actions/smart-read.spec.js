const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const tmp = require('tmp');
const smartRead = require('../../src/actions/smart-read');

describe('Testing smartRead', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  const writeFile = (filename, content) => {
    const filepath = path.join(dir, filename);
    fs.writeFileSync(filepath, content, 'utf8');
    return filepath;
  };

  it('Testing .json', () => {
    const filename = writeFile('file.json', '{"key":"value"}');
    expect(smartRead(filename)).to.deep.equal({ key: 'value' });
  });

  it('Testing .yml', () => {
    const filename = writeFile('file.yml', 'key: value');
    expect(smartRead(filename)).to.deep.equal({ key: 'value' });
  });

  it('Testing .js', () => {
    const filename = writeFile('file.js', "module.exports = {key: 'value'};");
    expect(smartRead(filename)).to.deep.equal({ key: 'value' });
  });

  it('Testing .js cache invalidation', () => {
    const filename = writeFile('file.js', "module.exports = {key: 'value'};");
    expect(smartRead(filename)).to.deep.equal({ key: 'value' });
    writeFile('file.js', "module.exports = {key: 'other'};");
    expect(smartRead(filename)).to.deep.equal({ key: 'other' });
  });

  it('Testing default', () => {
    const filename = writeFile('file.txt', 'line1\nline2');
    expect(smartRead(filename)).to.deep.equal(['line1', 'line2']);
  });

  it('Testing treatAs', () => {
    const filename = writeFile('file.txt', '{"key":"value"}');
    expect(smartRead(filename, { treatAs: 'json' })).to.deep.equal({ key: 'value' });
  });
});
