import knex from "knex"

const connection = knex({ // Estabelece conexão com o banco
    client: "mysql",
    connection:{
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "root",
      database: "EXMED",
      multipleStatements: true
    }
})

export default connection;