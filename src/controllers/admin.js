import { queryAll, querySingle } from '../database/queries/query';

export const adminGetAllRequests = (req, res) => {
  queryAll('SELECT * FROM requests ORDER BY ID ASC')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ Error: err.message }));
};

export const approveRequest = (req, res) => {
  const { requestId } = req.params;
  if (isNaN(requestId)) {
    res.status(400).send({ Error: 'Request id must be a number' });
  } else {
    const query = {
      text: 'UPDATE requests SET status=($1) WHERE (id=($2) AND (status=($3) OR status=($4))) RETURNING *',
      values: ['approved', requestId, 'pending', 'disapproved'],
    };
    querySingle(query)
      .then((request) => {
        if (request !== null && typeof request === 'object') {
          res.send(request);
        } else {
          res.status(404).send({
            Error: 'The given requestId does not exist or it has already been approved or resolved. Please check again',
          });
        }
      })
      .catch(err => res.send(err.message));
  }
};

export const resolveRequest = (req, res) => {
  const { requestId } = req.params;
  if (isNaN(requestId)) {
    res.status(400).send({ Error: 'Request id must be a number' });
  } else {
    const query = {
      text: 'UPDATE requests SET status=($1) WHERE (id=($2) AND status=($3)) RETURNING *',
      values: ['resolved', requestId, 'approved'],
    };
    querySingle(query)
      .then((request) => {
        if (request !== null && typeof request === 'object') {
          res.send(request);
        } else {
          res.status(404).send({
            Error: 'The given requestId does not exist or it has already been resolved or it is not approved yet. Please check again',
          });
        }
      })
      .catch(err => res.send(err.message));
  }
};

export const disapproveRequest = (req, res) => {
  const { requestId } = req.params;
  if (isNaN(requestId)) {
    res.status(400).send({ Error: 'Request id must be a number' });
  } else {
    const query = {
      text: 'UPDATE requests SET status=($1) WHERE (id=($2) AND (status=($3) OR status=($4))) RETURNING *',
      values: ['disapproved', requestId, 'pending', 'approved'],
    };
    querySingle(query)
      .then((request) => {
        if (request !== null && typeof request === 'object') {
          res.send(request);
        } else {
          res.status(404).send({
            Error: 'The given requestId does not exist or it has already been disapproved or resolved. Please check again',
          });
        }
      })
      .catch(err => res.send(err.message));
  }
};
