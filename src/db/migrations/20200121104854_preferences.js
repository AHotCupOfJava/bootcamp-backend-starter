const { createTableIfNotExists } = require('../helpers')

exports.up = async knex => createTableIfNotExists(knex, 'preferences', table => {
  table
    .uuid('userId')
    .notNullable()
    .unique()
    .references('users.id')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

  table
    .boolean('searchBar')
    .notNullable()
    .defaultTo(true)

  table
    .boolean('weatherCur')
    .notNullable()
    .defaultTo(false)

  table
    .boolean('greeting')
    .notNullable()
    .defaultTo(true)
  table.enum('orientation', ['CENTER', 'FLEX_START', 'FLEX_END']).notNullable()

  table.timestamp('createdAt').defaultTo(knex.fn.now())
  table.timestamp('updatedAt').defaultTo(knex.fn.now())
})

exports.down = async knex => knex.schema.dropTableIfExists('preferences')
