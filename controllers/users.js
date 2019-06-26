const { fetchUser } = require('../models/users');

exports.getUserByUsername = (req, res, next) => {
  fetchUser(req.params)
    .then(user => res.status(200).send({ user }))
    .catch(next);
};
