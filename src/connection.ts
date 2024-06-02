import knex from "knex";
import dotenv from 'dotenv';

dotenv.config();

const connection = knex({
    client: "mysql2", 
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 15615, 
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        multipleStatements: true
    }
});

export default connection;
