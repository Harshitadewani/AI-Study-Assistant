const { error } = require('../utils/response');

const validate = (validator) => (req, res, next) => {
  const errors = validator(req.body);
  if (errors.length > 0) return error(res, errors.join('; '), 400);
  next();
};

module.exports = { validate };
