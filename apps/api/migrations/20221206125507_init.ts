import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('user', (table) => {
    table.bigIncrements('id').primary()
    table.uuid('uuid').notNullable().unique()
    table.string('externalId').notNullable().unique()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('authProvider')
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
    table.timestamp('lastLoginAt').nullable()
  })

  await knex.schema.withSchema('public').createTable('packlist', (table) => {
    table.bigIncrements('id').notNullable()
    table
      .bigInteger('userId')
      .index()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.uuid('uuid').notNullable().unique()
    table.string('name').notNullable()
    table.string('description').nullable()
    table.string('slug').notNullable().unique()
    table.string('visibility').notNullable().defaultTo('HIDDEN')
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updatedAt').nullable()
  })

  await knex.schema
    .withSchema('public')
    .createTable('itemCategory', (table) => {
      table.bigIncrements('id').notNullable()
      table
        .bigInteger('itemCategoryId')
        .index()
        .references('id')
        .inTable('itemCategory')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.uuid('uuid').notNullable().unique()
      table.string('name').notNullable()
      table.string('type').notNullable()
    })

  await knex.schema.withSchema('public').createTable('item', (table) => {
    table.bigIncrements('id').notNullable()
    table
      .bigInteger('creatorId')
      .index()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table
      .bigInteger('itemCategoryId')
      .index()
      .references('id')
      .inTable('itemCategory')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.uuid('uuid').notNullable().unique()
    table.string('name').notNullable()
    table.string('description').nullable()
    table.integer('weight').nullable()
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updatedAt').nullable()
  })

  await knex.schema.withSchema('public').createTable('placement', (table) => {
    table
      .bigInteger('packlistId')
      .index()
      .references('id')
      .inTable('packlist')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table
      .bigInteger('itemId')
      .index()
      .references('id')
      .inTable('item')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.integer('amount').notNullable().defaultTo(1)
    table.primary(['packlistId', 'itemId'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTableIfExists('placement')
  await knex.schema.withSchema('public').dropTableIfExists('item')
  await knex.schema.withSchema('public').dropTableIfExists('itemCategory')
  await knex.schema.withSchema('public').dropTableIfExists('packlist')
  await knex.schema.withSchema('public').dropTableIfExists('user')
}
