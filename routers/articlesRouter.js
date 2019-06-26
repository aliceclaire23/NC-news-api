const express = require('express');
const articlesRouter = express.Router();
const { getArticles } = require('../controllers/articles');

articlesRouter.route('/').get(getarticles);

module.exports = articlesRouter;
