import bcrypt from 'bcrypt';
import { createToken } from '../middlewares/jwt';
import { querySingle } from '../database/queries/query';

export const signUp = (req, res) => {
  const {
    email, firstName, lastName, dept, password, employeeCode,
  } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const query = {
    text: 'INSERT INTO users (email, first_name, last_name, dept, password, employee_code) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    values: [email, firstName, lastName, dept, hashedPassword, employeeCode],
  };
  querySingle({ text: 'SELECT * FROM users WHERE email=($1)', values: [email] })
    .then((response) => {
      if (response) {
        res.status(400).send({ Error: 'The email provided is already registered. Please try again' });
      } else {
        querySingle(query, res)
          .then((data) => {
            if (data.id) {
              const { id, role, created_at } = data; // eslint-disable-line camelcase
              const user = {
                id, role, firstName, lastName, dept, craetedAt: created_at,
              };
              const token = createToken(user);
              res.status(201).send({ token, user });
            }
          })
          .catch(err => res.status(500).send({ Error: err.message }));
      }
    });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const query = {
    text: 'SELECT * FROM users WHERE email=($1)',
    values: [email],
  };
  const unauthenticatedError = { Error: 'Incorrect details. Please be sure you typed them correctly' };
  querySingle(query)
    .then((request) => { // eslint-disable-line
      if (request) {
        const passwordIsValid = bcrypt.compareSync(password, request.password);
        if (!passwordIsValid) {
          res.status(401).send(unauthenticatedError);
        } else {
          const { id, dept, role } = request;
          const firstName = request.first_name;
          const lastName = request.last_name;
          const createdAt = request.created_at;
          const user = {
            id, role, firstName, lastName, dept, createdAt,
          };
          const token = createToken(user);
          return res.send({ token, user });
        }
      } else {
        return res.status(401).send(unauthenticatedError);
      }
    })
    .catch(err => res.status(500).send({ Error: err.message }));
};
