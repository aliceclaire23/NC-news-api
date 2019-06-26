const express = require('express');
const { topicsRouter, usersRouter, articlesRouter } = require('./index');
const apiRouter = express.Router();

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);

module.exports = apiRouter;
