exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function (table) {
            table.increments('id')
                .primary()
                .unique();
            table.string('email')
                .notNullable()
                .unique();
            table.string('first_name')
                .notNullable();
            table.string('last_name')
                .notNullable();
        })

        // ...
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.raw('DROP TABLE users CASCADE')
        // ...
    ])
};
