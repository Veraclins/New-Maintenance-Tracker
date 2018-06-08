import required from './required';
import handleErrors from './errors';

export const validateSignUp = (req, res, next) => {
  const errors = {};
  // Checks that all fields are present
  const field = ['firstName', 'lastName', 'email', 'password', 'passwordConfirmation', 'dept', 'employeeCode'];
  const user = required(req, res, field);
  const {
    firstName, lastName, email, password, passwordConfirmation, dept, employeeCode,
  } = user;

    // Validate each field
  if (firstName.length < 3 || !/[A-Z][a-z]/.test(firstName)) errors.firstName = 'must be string and at least three characters';
  /* eslint-disable no-useless-escape */
  // regex gotten from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email)) {
    errors.email = 'must be a valid email';
  }
  if (lastName.length < 3 || !/[A-Z][a-z]/.test(lastName)) errors.lastName = 'must be string and at least three characters';
  if (password.length < 6) errors.password = 'must be at least six characters';
  if (password !== passwordConfirmation) errors.passwordConfirmation = 'must match password';
  if (dept.length < 5 || !/[A-Z][a-z]\s*/.test(dept)) errors.dept = 'must be string(only letters) and at least five characters';
  if (!/[A-Z]{2}\d{3}/g.test(employeeCode)) errors.employeeCode = 'must be in the form AB123';
  handleErrors(errors, res, next);
};

export const validateLogin = (req, res, next) => {
  const errors = {};
  // Checks that all fields are present
  const field = ['email', 'password'];
  const user = required(req, res, field);
  const { email, password } = user;

  /* eslint-disable no-useless-escape */
  // regex gotten from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email)) {
    errors.email = 'must be a valid email';
  }
  if (password.length < 6) errors.password = 'must be at least six characters';
  handleErrors(errors, res, next);
};
