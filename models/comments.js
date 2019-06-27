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

exports.fetchComments = article_id => {
  return connection
    .select('*')
    .from('comments')
    .modify(query => {
      if (article_id) query.where('comments.article_id', article_id);
    });
};
