import required from './required';
import handleErrors from './errors';

const validateRequest = (req, res, next) => {
  const errors = {};
  // Checks that all fields are present
  const field = ['title', 'duration', 'description'];
  const request = required(req, res, field);
  const { title, duration, description } = request;
  if (title.length < 10 || !/[A-Z][a-z]/.test(title)) {
    errors.title = 'must be string and at least 10 characters long';
  }
  if (duration.length > 2 || !/\d/.test(duration)) {
    errors.duration = 'must be a number not greater than 2 digits';
  }
  if (description.length < 20 || !/[A-Za-z0-9\s_.,!"()?@'/$]*/.test(description)) {
    errors.description = 'must be at least 20 characters long';
  }
  handleErrors(errors, res, next);
};

export default validateRequest;
