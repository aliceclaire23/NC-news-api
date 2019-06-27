const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter');

app.use(express.json());
app.use('/api', apiRouter);

// handle psql 400 errors
app.use((err, req, res, next) => {
  const codes = ['22P02', '23502', '23503', '42703'];
  if (codes.includes(err.code)) {
    res.status(400).send({ msg: 'bad request' });
  } else if (err.code === '22003') {
    res.status(422).send({ msg: 'unprocessable entity' });
  } else {
    next(err);
  }
});

// 500 errors
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
});

module.exports = app;
