import { expect } from 'chai';
import { describe } from 'node-tdd';
import smartParse from '../../src/logic/smart-parse.js';

describe('Testing smartParse', () => {
  it('Testing default', () => {
    expect(smartParse('{}')).to.deep.equal(['{}']);
  });

  it('Testing json', () => {
    expect(smartParse('{}', { treatAs: 'json' })).to.deep.equal({});
  });

  it('Testing .yml (resolve)', async () => {
    expect(await smartParse('<<<:\n  - key: value', { treatAs: 'yml' }))
      .to.deep.equal({ key: 'value' });
  });
});
