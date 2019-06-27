const express = require('express');
const commentsRouter = express.Router();
const { patchComment } = require('../controllers/comments');

commentsRouter.route('/:comment_id').patch(patchComment);

module.exports = commentsRouter;
