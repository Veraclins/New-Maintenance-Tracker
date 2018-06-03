

const validateRequest = (req, res, next) => {
  const errors = {};
  const input = req.body;
  const request = {};

  // Removes empty spaces
  Object.entries(input).forEach(([key, value]) => {
    request[key] = value.trim();
  });
  const { title, duration, description } = request;
  // Checks that all fields are present
  const required = ['title', 'duration', 'description'];
  required.forEach((element) => {
    if (!(element in request)) {
      errors[element] = `${element} is required`;
    }
  });
  if (Object.keys(errors).length !== 0) {
    res.status(400).send(errors);
  } else {
    if (title.length < 10 || !/[A-Z][a-z]/.test(title)) {
      errors.title = 'must be string and at least 10 characters long';
    }

    if (title.length > 2 || !/\d/.test(duration)) {
      errors.duration = 'must be a number not greater than 2 digits';
    }

    if (description.length < 20 || !/[A-Za-z0-9\s_.,!"()?@'/$]*/.test(description)) {
      errors.description = 'must be at least 20 characters long';
    }

    if (Object.keys(errors).length !== 0) {
      res.status(400).send(errors);
    } else {
      next();
    }
  }
};

export default validateRequest;
