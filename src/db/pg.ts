import { Client } from 'knex';

export default class DbConnection {

    public db: Client;

    constructor() {
        console.log('Connecting to database...');
        this.db = new Client({
            client: 'pg',
            debug: true,
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PWD,
                database: process.env.DB_NAME
            }
        });
    }
}
