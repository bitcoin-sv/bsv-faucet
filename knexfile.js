// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.POSTGRES_URL,
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.POSTGRES_URL,
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
