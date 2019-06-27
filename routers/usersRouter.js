const express = require('express');
const usersRouter = express.Router();
const { getUserByUsername } = require('../controllers/users');

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .all(send405Error);

module.exports = usersRouter;
