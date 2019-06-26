const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest')(app);
const { connection } = require('../db/connection');

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => {
    connection.destroy();
  });
  describe('/topics', () => {
    it('GET all topics', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics[0]).to.contain.keys('slug', 'description');
        });
    });
  });
  describe('/users/:username', () => {
    it('GET user by usename', () => {
      return request
        .get('/api/users/jessjelly')
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user[0]).to.contain.keys('username', 'avatar_url', 'name');
          expect(user.length).to.equal(1);
        });
    });
  });
  describe('/articles/:article_id', () => {
    it('GET article by article_id', () => {
      return request
        .get('/api/articles/jessjelly')
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user[0]).to.contain.keys('username', 'avatar_url', 'name');
          expect(user.length).to.equal(1);
        });
    });
  });
});
