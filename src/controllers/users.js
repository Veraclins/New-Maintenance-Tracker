import pool from '../database';
import { queryAll } from '../database/queries/query';

export const getAllRequests = (req, res) => {
  const userId = req.user.id;
  const query = {
    text: 'SELECT * FROM requests WHERE users_id=($1) ORDER BY ID ASC',
    values: [userId],
  };
  queryAll(query) {
    if(data) 
  }
  (async () => {
    const client = await pool.connect();
    const data = [];
    try {
      client.query('SELECT * FROM requests WHERE users_id=($1) ORDER BY ID ASC', [userId])
        .then((response) => {
          const { rows } = response;
          rows.forEach((row) => {
            data.push(row);
          });
          res.send(data);
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};

export const createRequest = (req, res) => {
  (async () => {
    const { title, duration, description } = req.body;
    const userId = req.user.id;
    const query = {
      text: 'INSERT INTO requests (users_id, title, duration, description) VALUES($1, $2, $3, $4) RETURNING *',
      values: [userId, title, duration, description],
    };
    const client = await pool.connect();
    try {
      await client.query(query)
        .then((response) => {
          const request = response.rows[0];
          res.send(request);
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};

export const getRequestById = (req, res) => {
  (async () => {
    const { requestId } = req.params;
    const userId = req.user.id;
    const client = await pool.connect();
    try {
      await client.query('SELECT * FROM requests WHERE (id=($1) AND users_id=($2))', [requestId, userId])
        .then((response) => {
          const request = response.rows[0];
          if (request !== null && typeof request === 'object') {
            res.send(request);
          } else {
            res.status(404).send({
              status: 'Not Found',
              message: "You don't seem to have a request with the given id. Please check again",
            });
          }
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};

export const UpdateRequest = (req, res) => {
  (async () => {
    const { title, duration, description } = req.body;
    const userId = req.user.id;
    const { requestId } = req.params;
    const query = {
      text: 'UPDATE requests SET title=($1), duration=($2), description=($3) WHERE (id=($4) AND users_id=($5) AND status=($6)) RETURNING *',
      values: [title, duration, description, requestId, userId, 'pending'],
    };
    const client = await pool.connect();
    try {
      await client.query(query)
        .then((response) => {
          const request = response.rows[0];
          if (request !== null && typeof request === 'object') {
            res.send(request);
          } else {
            res.status(404).send({
              status: 'Not Found',
              message: "You don't seem to have a request with the given id. Please check again",
            });
          }
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};
