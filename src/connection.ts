import knex from "knex"
import dotenv from 'dotenv'

dotenv.config()

const connection = knex({ 
    client: "mysql",
    connection:{
      host: process.env.DB_HOST,
      port: 15615,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      multipleStatements: true,
      connectTimeout: 60000
    }
})

export default connection;