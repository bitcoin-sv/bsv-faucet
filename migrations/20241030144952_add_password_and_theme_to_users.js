/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('users', function (table) {
      table.string('password').notNullable();
      table.enu('theme', ['light', 'dark']).defaultTo('light').notNullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.alterTable('users', function (table) {
      table.dropColumn('password');
      table.dropColumn('theme');
    });
  };
  