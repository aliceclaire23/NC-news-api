const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter');

app.use(express.json());
app.use('/api', apiRouter);

// 500 errors
app.use((err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
});

module.exports = app;
