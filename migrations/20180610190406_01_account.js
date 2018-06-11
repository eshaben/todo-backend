exports.up = function(knex, Promise) {
  return knex.schema.createTable('account', (table) =>{
  table.increments();
  table.text('email').notNullable().unique();
  table.text('password').notNullable();
  table.text('firstName').notNullable();
  table.text('lastName').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('account');
};
