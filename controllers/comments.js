const {
  createComment,
  fetchComments,
  updateComment,
  destroyComment,
  checkCommentId
} = require('../models/comments');
const { checkArticleId } = require('../models/articles');

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;

  checkArticleId(article_id)
    .then(article => {
      if (article.length > 0) {
        createComment(article_id, newComment)
          .then(addedComment => {
            res.status(201).send({ comment: addedComment[0] });
          })
          .catch(next);
      } else {
        res.status(404).send({ msg: 'not found' });
      }
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
  const inc_votes = req.body.inc_votes || 0;

  checkCommentId(comment_id)
    .then(comment => {
      if (comment.length > 0) {
        updateComment(comment_id, inc_votes)
          .then(patchedComment => {
            res.status(200).send({ comment: patchedComment[0] });
          })
          .catch(next);
      } else {
        res.status(404).send({ msg: 'not found' });
      }
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  checkCommentId(comment_id)
    .then(comment => {
      if (comment.length > 0) {
        destroyComment(comment_id)
          .then(() => {
            res.status(204).send({});
          })
          .catch(next);
      } else {
        res.status(404).send({ msg: 'not found' });
      }
    })
    .catch(next);
};
