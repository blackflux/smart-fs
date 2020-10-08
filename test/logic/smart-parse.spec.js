const expect = require('chai').expect;
const { describe } = require('node-tdd');
const smartParse = require('../../src/logic/smart-parse');

describe('Testing smartParse', () => {
  it('Testing default', () => {
    expect(smartParse('{}')).to.deep.equal(['{}']);
  });

  it('Testing json', () => {
    expect(smartParse('{}', { treatAs: 'json' })).to.deep.equal({});
  });

  it('Testing .yml (resolve)', () => {
    expect(smartParse('<<<:\n  - key: value', { treatAs: 'yml' }))
      .to.deep.equal({ key: 'value' });
  });
});
