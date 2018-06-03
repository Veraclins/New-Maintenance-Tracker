import pool from '../database';

export const queryData = {
  (async () => {
    const client = await pool.connect();
    try {
      await client.query(query)
        .then((response) => {
          const data = response.rows[0];
          if (data) {
            req.queryData = data;
          } else {
            return req.errors;
          }
        })
        .catch(err => res.status(500).send({ error: err.message }));
    } catch (err) {
      return res.status(500).send({ error: err.message });
    } finally {
      client.release();
    }
  })();
}


export function queryRequest(req, res, query) {
  (async () => {
    const client = await pool.connect();
    try {
      await client.query(query)
        .then((response) => {
          req.user = response.rows[0];
        })
        .catch(() => res.status(401).send({
          error: 'Please check the details you entered and try again',
        }));
    } finally {
      client.release();
    }
  })();
}

