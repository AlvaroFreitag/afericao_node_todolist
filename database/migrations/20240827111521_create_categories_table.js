export const up = async function(knex) {
    await knex.schema.createTable('categories', table => {
        table.bigIncrements('id')
            .primary();

        table.bigInteger('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users');

        table.string('title', 255)
            .notNullable();

        table.timestamps(false, true);

        table.dateTime('deleted_at')
            .index();
    });
};

export const down = async function (knex) {
    await knex.schema.alterTable('categories', table => {
        table.dropForeign(['user_id'])
    });
       
    await table.dropTable('categories'); 
};