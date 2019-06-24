const { expect } = require('chai');
const { formatDate, makeRefObj, formatComments } = require('../db/utils/utils');

describe('formatDate', () => {
  it('returns a new array', () => {
    const list = [];
    expect(formatDate(list)).to.be.an('array');
    expect(formatDate(list)).to.not.equal(list);
  });
  it('does not mutate the original array', () => {
    const list = [
      {
        title: 'title',
        topic: 'name',
        author: 'author',
        body: 'body',
        created_at: 0
      }
    ];
    const listValues = [
      {
        title: 'title',
        topic: 'name',
        author: 'author',
        body: 'body',
        created_at: 0
      }
    ];
    formatDate(list);
    expect(list).to.eql(listValues);
  });
  it('returns a new list of objects with timestamps formatted as Date objects', () => {
    const list = [
      {
        title: 'title',
        topic: 'name',
        author: 'author',
        body: 'body',
        created_at: 0
      }
    ];
    const actual = formatDate(list)[0].created_at;
    const expected = new Date(0);
    expect(actual).to.eql(expected);
  });
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});
