const express = require('express');
const topicsRouter = express.Router();
const { getTopics } = require('../controllers/topics');

topicsRouter
  .route('/')
  .get(getTopics)
  .all(send405Error);

module.exports = topicsRouter;
