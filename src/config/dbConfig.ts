import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Create a new connection pool
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Test the connection pool to ensure it works
pool.connect((err, _client, release) => {
  if (err) {
    console.error("Error acquiring client", err.stack);
    process.exit(-1); // Exit the process if the connection fails
  } else {
    console.log("Connected to PostgreSQL database");
    release(); // Release the client back to the pool
  }
});

// Handle errors on idle clients
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1); // Exit the process if an idle client error occurs
});

// Export a query function for reusable queries
export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;
