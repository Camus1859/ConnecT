require("dotenv").config();

const { Pool } = require("pg");

let pool;

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    });
} else {
// if on local
    pool = new Pool({
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      database: process.env.POSTGRES_DB,
    });
}


module.exports = { pool };
