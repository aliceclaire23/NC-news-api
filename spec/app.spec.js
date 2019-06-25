const { app } = require('../app');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest')(app);
const { connection } = require('../db/connection');

describe('/api', () => {
  after(() => {
    client.end();
  });
  // describe('/topics', () => {
  //   it('GET all topics', () => {
  //     return request
  //       .get('/api/topics')
  //       .expect(200)
  //       .then(({ body: { topics } }) => {
  //         expect(1).to.equal(1);
  //       });
  //   });
  // });
});
