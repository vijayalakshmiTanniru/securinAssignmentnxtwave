const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "recipesdb",
  password: "password",
  port: 5432,
});

module.exports = pool;

