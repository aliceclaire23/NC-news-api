const { fetchArticles, updateArticle } = require('../models/articles');

exports.getArticles = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order, author, topic } = req.query;
  fetchArticles(article_id, sort_by, order, author, topic)
    .then(articles => {
      if (articles.length < 1) {
        res.status(404).send({ msg: 'not found' });
      } else res.status(200).send({ articles });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const inc_votes = req.body.inc_votes;
  updateArticle(article_id, inc_votes)
    .then(patchedArticle => {
      res.status(200).send({ article: patchedArticle[0] });
    })
    .catch(next);
};
