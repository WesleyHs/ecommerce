const { Pool } = require("pg") //conecta com o 

module.exports = new Pool({
    user: 'postgres',
    password: "W16991751768",
    host: "localhost",
    port: 5432,
    database: "launchstoredb"
})