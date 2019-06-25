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

describe('makeRefObj', () => {
  it('returns an object', () => {
    const list = [];
    expect(makeRefObj(list)).to.be.an('object');
  });
  it('does not mutate the original array', () => {
    const list = [
      {
        article_id: 1,
        title: 'Title 1'
      }
    ];
    const listValues = [
      {
        article_id: 1,
        title: 'Title 1'
      }
    ];
    makeRefObj(list);
    expect(list).to.eql(listValues);
  });
  it('takes and array of objects and returns a reference object with keys of each items title, and values being each items corresponding id', () => {
    const list = [
      { article_id: 1, title: 'Title 1' },
      { article_id: 2, title: 'Title 2' },
      { article_id: 3, title: 'Title 3' }
    ];
    const actual = makeRefObj(list);
    const expected = { 'Title 1': 1, 'Title 2': 2, 'Title 3': 3 };
    expect(actual).to.eql(expected);
  });
});

describe('formatComments', () => {
  it('returns a new array', () => {
    const list = [];
    expect(formatComments(list)).to.be.an('array');
    expect(formatComments(list)).to.not.equal(list);
  });
  it('does not mutate the original array', () => {
    const comments = [
      {
        body: 'This morning, I showered for nine minutes.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 975242163389
      }
    ];
    const commentsValues = [
      {
        body: 'This morning, I showered for nine minutes.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 975242163389
      }
    ];
    const articleRef = { 'Living in the shadow of a great man': 1 };
    formatComments(comments, articleRef);
    expect(comments).to.eql(commentsValues);
  });
  it('returns a new array of comment objects with author keys with the created_by values', () => {
    const comments = [
      {
        body: 'This morning, I showered for nine minutes.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 975242163389
      }
    ];
    const articleRef = { 'Living in the shadow of a great man': 1 };
    const actual = formatComments(comments, articleRef);
    expect(actual[0].author).to.eql(comments[0].created_by);
  });
  it('returns a new array of comment objects with article_id keys instead of belongs_to, which have values taken from articleRef', () => {
    const comments = [
      {
        body: 'This morning, I showered for nine minutes.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 975242163389
      }
    ];
    const articleRef = { 'Living in the shadow of a great man': 1 };
    const actual = formatComments(comments, articleRef);
    expect(actual[0].article_id).to.eql(1);
  });
  it('returns a new array of comment objects maintaining the votes from the comments passed', () => {
    const comments = [
      {
        body: 'This morning, I showered for nine minutes.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 975242163389
      }
    ];
    const articleRef = { 'Living in the shadow of a great man': 1 };
    const actual = formatComments(comments, articleRef);
    expect(actual[0].votes).to.eql(comments[0].votes);
  });
  it('returns a new array of comment objects with created_at values converted into JS Date objects', () => {
    const comments = [
      {
        body: 'This morning, I showered for nine minutes.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 975242163389
      }
    ];
    const articleRef = { 'Living in the shadow of a great man': 1 };
    const actual = formatComments(comments, articleRef);
    const expected = new Date(975242163389);
    expect(actual[0].created_at).to.eql(expected);
  });
  it('returns a new array of comment objects maintaining the body from the comments passed', () => {
    const comments = [
      {
        body: 'This morning, I showered for nine minutes.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 975242163389
      }
    ];
    const articleRef = { 'Living in the shadow of a great man': 1 };
    const actual = formatComments(comments, articleRef);
    expect(actual[0].body).to.eql(comments[0].body);
  });
});
