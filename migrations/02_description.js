exports.up = function(knex, Promise) {
  return knex.schema.createTable('description', (table) =>{
  table.increments();
  table.text('description').notNullable();
  table.text('font');
  table.text('highlightColor');
  table.boolean('bold');
  table.boolean('italicize');
  table.boolean('underline');
  table.text('color');
  table.text('backgroundColor');
  table.integer('size');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('description');
};
