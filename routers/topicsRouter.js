const express = require('express');
const topicsRouter = express.Router();
const { getTopics } = require('../controllers/topics');
const { send405Error } = require('../errors');

topicsRouter
  .route('/')
  .get(getTopics)
  .all(send405Error);

module.exports = topicsRouter;
