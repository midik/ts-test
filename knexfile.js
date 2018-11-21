module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            database: 'localhost',
            user: 'root',
            password: '123'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    staging: {},
    production: {}
};
