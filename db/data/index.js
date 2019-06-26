const ENV = process.env.NODE_ENV || 'development';
const development = require('../data/dev-data');
const test = require('../data/test-data');

const dataConfig = {
  development,
  test
};

module.exports = dataConfig[ENV];
