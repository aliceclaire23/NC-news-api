const express = require('express');
const commentsRouter = express.Router();
const { patchComment, deleteComment } = require('../controllers/comments');

commentsRouter
  .route('/:comment_id')
  .patch(patchComment)
  .delete(deleteComment);

module.exports = commentsRouter;
