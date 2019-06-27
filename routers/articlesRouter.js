const express = require('express');
const articlesRouter = express.Router();
const { getArticles, patchArticle } = require('../controllers/articles');
const {
  postComment,
  getCommentsByArticleId
} = require('../controllers/comments');

articlesRouter
  .route('/:article_id')
  .get(getArticles)
  .patch(patchArticle);

articlesRouter
  .route('/:article_id/comments')
  .post(postComment)
  .get(getCommentsByArticleId);

articlesRouter.route('/').get(getArticles);

module.exports = articlesRouter;
