const { fetchUser } = require('../models/users');

exports.getUsers = (req, res, next) => {
  fetchUser(req.params)
    .then(users => {
      if (users.length < 1) {
        res.status(404).send({ msg: 'not found' });
      } else if (users.length === 1) {
        const user = users[0];
        res.status(200).send({ user });
      } else {
        res.status(200).send({ users });
      }
    })
    .catch(next);
};
