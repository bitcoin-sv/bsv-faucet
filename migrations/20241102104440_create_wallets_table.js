/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('wallets', function (table) {
        table.increments('id').primary();
        table.text('address').unique().notNullable();
        table.text('privateKey').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('wallets');
};
