import { Pool } from 'pg';

// This instantiates a connection pool that can be imported and used in other places
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});


export default pool;
