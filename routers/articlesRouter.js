const express = require('express');
const articlesRouter = express.Router();
const {
  getArticleByArticleId,
  patchArticle
} = require('../controllers/articles');

articlesRouter
  .route('/:article_id')
  .get(getArticleByArticleId)
  .patch(patchArticle);

module.exports = articlesRouter;
