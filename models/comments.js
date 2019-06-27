const { connection } = require('../db/connection');

exports.createComment = (article_id, newComment) => {
  newComment.author = newComment.username;
  delete newComment.username;
  newComment.article_id = article_id;
  newComment.created_at = new Date();
  return connection
    .insert(newComment)
    .into('comments')
    .returning('*');
};

exports.fetchComments = (article_id, sort_by, order) => {
  return connection
    .select('*')
    .from('comments')
    .modify(query => {
      if (article_id) query.where('comments.article_id', article_id);
    })
    .orderBy(sort_by || 'created_at', order || 'desc');
};

exports.updateComment = (comment_id, inc_votes) => {
  return connection('comments')
    .where({ comment_id: comment_id })
    .increment('votes', inc_votes)
    .returning('*');
};

exports.destroyComment = comment_id => {
  return connection('comments')
    .where({ comment_id: comment_id })
    .delete();
};
