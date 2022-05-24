const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Shakir123",
    port:5614,
    host:"localhost",
    database:"usersdb"
})
module.exports = pool;
