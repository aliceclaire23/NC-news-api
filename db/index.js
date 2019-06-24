const ENV = process.env.NODE_ENV || 'development';
const development = require('../db/development-data');
const test = require('../db/test-data');

const dataConfig = {
  development,
  test
};

module.exports = dataConfig[ENV];
