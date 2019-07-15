const { connection } = require('../db/connection');

exports.fetchArticles = (article_id, sort_by, order, author, topic, res) => {
  return connection
    .select('articles.*')
    .from('articles')
    .count('articles.article_id as comment_count')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id')
    .modify(query => {
      if (article_id) query.where('articles.article_id', article_id);
      if (author) query.where('articles.author', author);
      if (topic) query.where('articles.topic', topic);
    })
    .orderBy(sort_by || 'created_at', order || 'desc');
};

exports.updateArticle = (article_id, inc_votes = 0) => {
  return connection('articles')
    .where({ article_id: article_id })
    .increment('votes', inc_votes)
    .returning('*');
};

exports.checkArticleId = article_id => {
  return connection
    .select('articles.*')
    .from('articles')
    .where('articles.article_id', article_id);
};
