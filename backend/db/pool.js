const { Pool } = require("pg");

const url = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: "postgresql://raze:raze@localhost:5432/mental",
});
module.exports = pool;
