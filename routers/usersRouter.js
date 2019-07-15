const express = require('express');
const usersRouter = express.Router();
const { getUsers } = require('../controllers/users');
const { send405Error } = require('../errors');

usersRouter
  .route('/:username')
  .get(getUsers)
  .all(send405Error);

module.exports = usersRouter;
