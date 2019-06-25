const express = require('express');
const topicsRouter = require('./topicsRouter');
const apiRouter = express.Router();

apiRouter.use('/topics', topicsRouter);

module.exports = apiRouter;
