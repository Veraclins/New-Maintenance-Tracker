import { updateError } from './errors';

export function multiResponseHandler(res, response, err) {
  const data = [];
  if (response) {
    res.send(data);
  } else {
    res.send(err.message);
  }
}


export function singleResponseHandler(res, response) {
  const request = response.rows[0];
  if (request !== null && typeof request === 'object') {
    res.send(request);
  } else {
    res.status(404).send(updateError);
  }
}

