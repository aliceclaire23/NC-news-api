const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../index.js');

const { formatDate, formatComments, makeRefObj } = require('../utils/utils');

exports.seed = function(knex, Promise) {
  const topicsInsertions = knex('topics').insert(topicData);
  // .return('*') ????
  const usersInsertions = knex('users').insert(userData);

  return Promise.all([topicsInsertions, usersInsertions])
    .then(() => {
      const formattedArticles = formatDate(articleData);
      return knex('articles').insert(formattedArticles);
    })
    .then(articleRows => {
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      return knex('comments').insert(formattedComments);
    });
};
