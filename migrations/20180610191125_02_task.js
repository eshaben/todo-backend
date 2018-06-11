exports.up = function(knex, Promise) {
  return knex.schema.createTable('task', (table) =>{
  table.increments();
  table.integer('description_id').references('description.id').unsigned().onDelete('cascade');
  table.integer('status_id').references('status.id').unsigned().onDelete('cascade');
  table.integer('account_id').references('account.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('task');
};
