const { fetchTopics } = require('../models/topics');

const getTopics = (req, res, next) => {
  fetchTopics(req.query)
    .then(topics => res.status(200).send({ topics }))
    .catch(next);
};

module.exports = getTopics;
