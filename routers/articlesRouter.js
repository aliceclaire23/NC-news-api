const express = require('express');
const articlesRouter = express.Router();
const { getArticles, patchArticle } = require('../controllers/articles');
const {
  postComment,
  getCommentsByArticleId
} = require('../controllers/comments');
const { send405Error } = require('../errors');

articlesRouter
  .route('/:article_id')
  .get(getArticles)
  .patch(patchArticle)
  .all(send405Error);

articlesRouter
  .route('/:article_id/comments')
  .post(postComment)
  .get(getCommentsByArticleId)
  .all(send405Error);

articlesRouter
  .route('/')
  .get(getArticles)
  .all(send405Error);

module.exports = articlesRouter;
