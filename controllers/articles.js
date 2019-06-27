const { fetchArticles, updateArticle } = require('../models/articles');

exports.getArticleByArticleId = (req, res, next) => {
  fetchArticles(req.params)
    .then(article => res.status(200).send({ article }))
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
