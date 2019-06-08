const expect = require('chai').expect;
const objectOrder = require('../../src/util/object-order');

describe('Integration object-order.js', () => {
  const runTest = (existing, template, expected) => {
    expect(JSON.stringify(objectOrder(existing, template), null, 2).split('\n'))
      .to.deep.equal(JSON.stringify(expected, null, 2).split('\n'));
  };

  it('Testing Basic Ordering', () => {
    const existing = { key1: 'value1', key2: 'value2' };
    const template = { key2: 'value2', key1: 'value1' };
    const expected = { key2: 'value2', key1: 'value1' };
    runTest(existing, template, expected);
  });

  it('Testing Recursive Ordering', () => {
    const existing = { key: { key1: 'value1', key2: 'value2' } };
    const template = { key: { key2: 'value2', key1: 'value1' } };
    const expected = { key: { key2: 'value2', key1: 'value1' } };
    runTest(existing, template, expected);
  });

  it('Testing Additional Entry Appends', () => {
    const existing = { key3: 'value3', key2: 'value2', key1: 'value1' };
    const template = { key1: 'value1' };
    const expected = { key1: 'value1', key2: 'value2', key3: 'value3' };
    runTest(existing, template, expected);
  });
});
