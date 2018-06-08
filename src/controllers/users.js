import { queryAll, querySingle } from '../database/queries/query';
import { validParam, handleRequest } from '../database/handler';

export const getAllRequests = (req, res) => {
  const userId = req.user.id;
  const query = {
    text: 'SELECT * FROM requests WHERE users_id=($1) ORDER BY ID ASC',
    values: [userId],
  };
  queryAll(query)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ Error: err.message }));
};

export const createRequest = (req, res) => {
  const { title, duration, description } = req.body;
  const userId = req.user.id;
  const query = {
    text: 'INSERT INTO requests (users_id, title, duration, description) VALUES($1, $2, $3, $4) RETURNING *',
    values: [userId, title, duration, description],
  };
  querySingle(query)
    .then((request) => {
      res.status(201).send(request);
    })
    .catch(err => res.status(500).send({ Error: err.message }));
};

export const getRequestById = (req, res) => {
  const { requestId } = req.params;
  validParam(res, requestId);
  const userId = req.user.id;
  const query = {
    text: 'SELECT * FROM requests WHERE (id=($1) AND users_id=($2))',
    values: [requestId, userId],
  };
  const error = { Error: "You don't have a request with the given id. Please check again" };
  handleRequest(res, query, error);
};

export const UpdateRequest = (req, res) => {
  const { title, duration, description } = req.body;
  const userId = req.user.id;
  const { requestId } = req.params;
  validParam(res, requestId);
  const query = {
    text: 'UPDATE requests SET title=($1), duration=($2), description=($3) WHERE (id=($4) AND users_id=($5) AND status=($6)) RETURNING *',
    values: [title, duration, description, requestId, userId, 'pending'],
  };
  const error = { Error: "You don't have a request with the given id or it has already been approved. Please check again" };
  handleRequest(res, query, error);
};
