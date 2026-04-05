const validateRegister = (body) => {
  const { email, password, name } = body;
  const errors = [];
  if (!email?.trim()) errors.push('email is required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email must be valid');
  if (!password) errors.push('password is required');
  else if (password.length < 6) errors.push('password must be at least 6 characters');
  if (!name?.trim()) errors.push('name is required');
  return errors;
};

const validateLogin = (body) => {
  const { email, password } = body;
  const errors = [];
  if (!email?.trim()) errors.push('email is required');
  if (!password) errors.push('password is required');
  return errors;
};

module.exports = { validateRegister, validateLogin };
