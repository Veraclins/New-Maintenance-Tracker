import { client } from '../database';

export const adminGetAllRequests = (req, res) => {
  (async () => {
    try {
      client.query('SELECT * FROM requests ORDER BY ID ASC')
        .then((response) => {
          const { rows } = response;
          res.send(rows);
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};

export const approveRequest = (req, res) => {
  (async () => {
    const { requestId } = req.params;
    const query = {
      text: 'UPDATE requests SET status=($1) WHERE (id=($2) AND status=($3)) RETURNING *',
      values: ['approved', requestId, 'pending'],
    };
    try {
      await client.query(query)
        .then((response) => {
          const request = response.rows[0];
          if (request !== null && typeof request === 'object') {
            res.send(request);
          } else {
            res.status(404).send({
              message: 'The given requestId does not exist or it has already been approved/disapproved. Please check again',
            });
          }
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};

export const disapproveRequest = (req, res) => {
  (async () => {
    const { requestId } = req.params;
    const query = {
      text: 'UPDATE requests SET status=($1) WHERE (id=($2) AND status=($3)) RETURNING *',
      values: ['disapproved', requestId, 'pending'],
    };
    try {
      await client.query(query)
        .then((response) => {
          console.log(client);
          const request = response.rows[0];
          if (request !== null && typeof request === 'object') {
            res.send(request);
          } else {
            res.status(404).send({
              message: 'The given requestId does not exist or it has already been approved/disapproved. Please check again',
            });
          }
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};

export const resolveRequest = (req, res) => {
  (async () => {
    const { requestId } = req.params;
    const query = {
      text: 'UPDATE requests SET status=($1) WHERE (id=($2) AND status=($3)) RETURNING *',
      values: ['resolved', requestId, 'approved'],
    };
    try {
      await client.query(query)
        .then((response) => {
          const request = response.rows[0];
          if (request !== null && typeof request === 'object') {
            res.send(request);
          } else {
            res.status(404).send({
              message: 'The given requestId does not exist or it has has not been approved. Please check again',
            });
          }
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })().catch(e => console.log(e.stack));
};
