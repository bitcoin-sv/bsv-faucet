/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.text('user_id').unique().notNullable();
    table.text('username').unique().notNullable();
    table.text('email').unique().notNullable();
    table.enu('role', ['user', 'admin']).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
