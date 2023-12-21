import pg from "pg";
import { config } from "dotenv";

// Setting up env file
config();

const pool = new pg.Pool({
  host: process.env.PROD_DB_HOST,
  port: process.env.PROD_DB_PORT,
  user: process.env.PROD_DB_USER,
  password: process.env.PROD_DB_PASSWORD,
  database: process.env.PROD_DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
  sslmode: "require",
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 2000,
});

pool.connect();

console.log("Connected to Database");

export default pool;
