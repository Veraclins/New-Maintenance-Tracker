import { queryAll } from '../database/queries/query';
import { validParam, handleRequest } from '../database/handler';

const error = {
  Error: 'The given request id does not exist or it has already been approved or resolved. Please check again',
};
export const adminGetAllRequests = (req, res) => {
  queryAll('SELECT * FROM requests ORDER BY ID ASC')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ Error: err.message }));
};

const qString = 'UPDATE requests SET status=($1) WHERE (id=($2) AND (status=($3) OR status=($4))) RETURNING *';
export const approveRequest = (req, res) => {
  const { requestId } = req.params;
  validParam(res, requestId);
  const query = {
    text: qString,
    values: ['approved', requestId, 'pending', 'disapproved'],
  };
  handleRequest(res, query, error);
};

export const disapproveRequest = (req, res) => {
  const { requestId } = req.params;
  validParam(res, requestId);
  const query = {
    text: qString,
    values: ['disapproved', requestId, 'pending', 'approved'],
  };
  handleRequest(res, query, error);
};


export const resolveRequest = (req, res) => {
  const { requestId } = req.params;
  validParam(res, requestId);
  const query = {
    text: 'UPDATE requests SET status=($1) WHERE (id=($2) AND status=($3)) RETURNING *',
    values: ['resolved', requestId, 'approved'],
  };
  handleRequest(res, query, error);
};
