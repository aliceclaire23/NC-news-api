const {
  createComment,
  fetchComments,
  updateComment
} = require('../models/comments');

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
  const { sort_by, order } = req.query;
  fetchComments(article_id, sort_by, order)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const inc_votes = req.body.inc_votes;
  updateComment(comment_id, inc_votes)
    .then(patchedComment => {
      res.status(200).send({ comment: patchedComment[0] });
    })
    .catch(next);
};
