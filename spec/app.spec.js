const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest')(app);
const { connection } = require('../db/connection');
chai.use(require('chai-sorted'));

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => {
    connection.destroy();
  });
  describe('GET /api/topics', () => {
    it('GET all topics', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics[0]).to.contain.keys('slug', 'description');
        });
    });
  });
  describe('GET /api/users/:username', () => {
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
  describe('GET /api/articles/:article_id', () => {
    it('GET article by article_id', () => {
      return request
        .get('/api/articles/1')
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles[0]).to.contain.keys(
            'article_id',
            'title',
            'body',
            'votes',
            'topic',
            'author',
            'created_at',
            'comment_count'
          );
          expect(articles.length).to.equal(1);
          expect(articles[0].comment_count).to.equal('8');
        });
    });
  });
  describe('PATCH /api/articles/:article_id', () => {
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
    it('GET sort by parameter is created_by default', () => {
      return request.get('/api/articles/1/comments').then(res => {
        expect(res.body.comments).to.be.descendingBy('created_at');
      });
    });
    it('GET sort by parameter can be determined by query', () => {
      return request
        .get('/api/articles/1/comments?sort_by=author')
        .then(res => {
          expect(res.body.comments).to.be.descendingBy('author');
        });
    });
    it('GET sort order is descending default', () => {
      return request.get('/api/articles/1/comments').then(res => {
        expect(res.body.comments).to.be.descending;
      });
    });
    it('GET sort order can be determined by query', () => {
      return request
        .get('/api/articles/1/comments?sort_by=author&order=asc')
        .then(res => {
          expect(res.body.comments).to.be.ascendingBy('author');
        });
    });
    it('status:400 for invalid sort by parameter', () => {
      return request
        .get('/api/articles/1/comments?sort_by=HERES_GOOD&order=asc')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal('bad request');
        });
    });
  });
  describe('GET /api/articles', () => {
    it('GET all articles', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles[0]).to.contain.keys(
            'article_id',
            'title',
            'body',
            'votes',
            'topic',
            'author',
            'created_at',
            'comment_count'
          );
        });
    });
    it('GET sort by parameter is created_by default', () => {
      return request.get('/api/articles/').then(res => {
        expect(res.body.articles).to.be.descendingBy('created_at');
      });
    });
    it('GET sort by parameter can be determined by query', () => {
      return request.get('/api/articles/?sort_by=author').then(res => {
        expect(res.body.articles).to.be.descendingBy('author');
      });
    });
    it('GET sort order is descending default', () => {
      return request.get('/api/articles/').then(res => {
        expect(res.body.articles).to.be.descending;
      });
    });
    it('GET sort order can be determined by query', () => {
      return request
        .get('/api/articles/?sort_by=author&order=asc')
        .then(res => {
          expect(res.body.articles).to.be.ascendingBy('author');
        });
    });
    // it('GET can be filtered by author using query', () => {});
    // it('GET can be filtered by topic using  query', () => {});
  });
});
