/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('transactions', function (table) {
      table.increments('id').primary();
      table.timestamp('date').defaultTo(knex.fn.now());
      table.text('txid').unique().notNullable();
      table.text('rawTx').notNullable();
      table.json('beefTx').notNullable();
      table.json('vout').notNullable();
      table.text('txType').notNullable();
      table.boolean('spentStatus').defaultTo(false);
      table.boolean('testnetFlag').defaultTo(true);
      table.bigInteger('amount').notNullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('transactions');
  };
  