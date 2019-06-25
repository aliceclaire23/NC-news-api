const ENV = process.env.NODE_ENV || 'development';
const development = require('./db/development-data');
const test = require('./db/test-data');

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news'
    }
  },
  test: {
    connection: {
      database: 'nc_news_test'
    }
  }
};

const dataConfig = {
  development,
  test
};

module.exports = { ...customConfig[ENV], ...baseConfig, dataConfig };
