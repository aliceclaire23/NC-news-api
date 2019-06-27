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
  describe('GET /topics', () => {
    it('GET all topics', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics[0]).to.contain.keys('slug', 'description');
        });
    });
  });
  describe('GET /users/:username', () => {
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
  describe('GET /articles/:article_id', () => {
    it('GET article by article_id', () => {
      return request
        .get('/api/articles/1')
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article[0]).to.contain.keys(
            'article_id',
            'title',
            'body',
            'votes',
            'topic',
            'author',
            'created_at',
            'comment_count'
          );
          expect(article.length).to.equal(1);
          expect(article[0].comment_count).to.equal('8');
        });
    });
  });
  describe('PATCH /articles/:article_id', () => {
    it('PATCH article with additional votes', () => {
      return request
        .patch('/api/articles/1')
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article.votes).to.equal(1);
        });
    });
    it('status:400 when patching a value of incorrect type', () => {
      return request
        .patch('/api/articles/1')
        .send({ inc_votes: 'not a number!' })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal('bad request');
        });
    });
  });
  describe('POST /api/articles/:article_id/comments', () => {
    it('POST returns a status 201 and a comment object containing the new comment', () => {
      return request
        .post('/api/articles/1/comments')
        .send({
          username: 'jessjelly',
          body: 'hello world!'
        })
        .expect(201)
        .then(res => {
          expect(res.body.comment).to.contain.keys(
            'comment_id',
            'author',
            'article_id',
            'votes',
            'created_at',
            'body'
          );
        });
    });
    it('status:400 when posting an invalid foreign key', () => {
      return request
        .post('/api/articles/1/comments')
        .send({
          username: 1,
          body: 'hello world!'
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal('bad request');
        });
    });
    it('status:400 when missing required columns', () => {
      return request
        .post('/api/articles/1/comments')
        .send({
          body: 'hello world!'
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal('bad request');
        });
    });
    it('status:400 when adding non-existent columns', () => {
      return request
        .post('/api/articles/1/comments')
        .send({
          username: 'jessjelly',
          body: 'hello world!',
          test: 'fake column'
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal('bad request');
        });
    });
  });
  describe('GET /api/articles/:article_id/comments', () => {
    it('GET comments by article_id', () => {
      return request
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments.length).to.equal(8);
        });
    });
  });
});
