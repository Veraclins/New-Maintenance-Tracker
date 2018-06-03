import pool from '../database';
import { updateError } from './errors';

export function responseHandler(res, response, err) {
  const data = [];
  if (response) {
    res.send(data);
  } else {
    res.send(err.message);
  }
}

export function createTable(res, query) {
  (async () => {
    const client = await pool.connect();
    try {
      await client.query(query, (err, response) =>
        res.send(response));
    } finally {
      client.release();
    }
  })();
}

export function queryTable(res, query) {
  (async () => {
    const client = await pool.connect();
    try {
      await client.query(query, (err, response) => responseHandler(res, response, err));
    } finally {
      client.release();
    }
  })();
}

export function singleQuery(res, query) {
  (async () => {
    const client = await pool.connect();
    try {
      await client.query(query)
        .then((response) => {
          const request = response.rows[0];
          if (request !== null && typeof request === 'object') {
            res.send(request);
          } else {
            res.status(404).send(updateError);
          }
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
}

