import { pool } from '../database';
import { createRequestsTableQuery, createUsersTableQuery } from '../database/queries/create-tables';
import { seedRequestsQuery, seedUsersQuery } from '../database/queries/seed-table';

export default async function prepTable() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DROP TABLE requests;', console.log('drop requests'));
    await client.query('DROP TABLE users;', console.log('drop users'));
    await client.query(createRequestsTableQuery, console.log('create requests'));
    await client.query(createUsersTableQuery, console.log('create users'));
    await client.query(seedRequestsQuery, console.log('seed requests'));
    await client.query(seedUsersQuery, console.log('seed users'));
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
