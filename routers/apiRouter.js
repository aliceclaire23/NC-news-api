const express = require('express');
const {
  topicsRouter,
  usersRouter,
  articlesRouter,
  commentsRouter
} = require('./index');
const apiRouter = express.Router();

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
