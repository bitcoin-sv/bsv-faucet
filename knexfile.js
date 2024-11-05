// Update with your config settings.

const { parse } = require('pg-connection-string');

// Parse connection string
const parseConnectionString = (url) => {
  if (!url) {
    throw new Error('Database connection URL is required');
  }
  return parse(url);
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
        sslmode: 'require'
      },
    },
    pool: {
      min: 2,
      max: 10,
      acquireTimeoutMillis: 60000,
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100
    },
    acquireConnectionTimeout: 60000,
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
        sslmode: 'require'
      },
    },
    pool: {
      min: 2,
      max: 10,
      acquireTimeoutMillis: 60000,
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100
    },
    acquireConnectionTimeout: 60000,
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }
};
