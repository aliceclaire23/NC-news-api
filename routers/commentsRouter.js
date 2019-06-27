const express = require('express');
const commentsRouter = express.Router();
const { patchComment, deleteComment } = require('../controllers/comments');
const { send405Error } = require('../errors');

commentsRouter
  .route('/:comment_id')
  .patch(patchComment)
  .delete(deleteComment)
  .all(send405Error);

module.exports = commentsRouter;
