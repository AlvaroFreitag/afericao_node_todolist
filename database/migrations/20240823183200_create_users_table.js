export const up = async function (knex) {
  await knex.schema.createTable('users', table => {
    table.bigIncrements('id')
      .primary();

    table.string('cpf', 11)
      .notNullable()
      .unique();

    table.string('name', 255)
      .notNullable();

    table.string('email', 255)
      .notNullable()
      .unique();

    table.string('password', 255)
      .notNullable();

    table.timestamps(false, true);
  });
};

export const down = async function (knex) {
  await knex.schema.dropTableIfExists('users');
};
