exports.up = function(knex, Promise) {
  return knex.schema.createTable('status', (table) =>{
  table.increments();
  table.text('status').notNullable().unique();
  table.date('dateCreated').notNullable().defaultTo(knex.fn.now());
  table.date('dateUpdated').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('status');
};
