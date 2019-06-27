const express = require('express');
const articlesRouter = express.Router();
const {
  getArticleByArticleId,
  patchArticle
} = require('../controllers/articles');
const {
  postComment,
  getCommentsByArticleId
} = require('../controllers/comments');

articlesRouter
  .route('/:article_id')
  .get(getArticleByArticleId)
  .patch(patchArticle);

articlesRouter
  .route('/:article_id/comments')
  .post(postComment)
  .get(getCommentsByArticleId);

module.exports = articlesRouter;
