const { createComment, fetchComments } = require('../models/comments');

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  createComment(article_id, newComment)
    .then(addedComment => {
      res.status(201).send({ comment: addedComment[0] });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchComments(article_id).then(comments => {
    res.status(200).send({ comments });
  });
};
