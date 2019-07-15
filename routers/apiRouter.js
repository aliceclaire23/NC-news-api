const express = require('express');
const {
  topicsRouter,
  usersRouter,
  articlesRouter,
  commentsRouter
} = require('./index');
const apiRouter = express.Router();
const { send405Error } = require('../errors');
const { getEndpoints } = require('../controllers/api');

apiRouter
  .route('/')
  .get(getEndpoints)
  .all(send405Error);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
