const authService = require('../services/auth.service');
const { success, error } = require('../utils/response');

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const result = await authService.register({ email, password, name });
    return success(res, result, 201);
  } catch (err) {
    return error(res, err.message, err.message === 'Email already registered' ? 409 : 400);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    return success(res, result);
  } catch (err) {
    return error(res, err.message, 401);
  }
};

const me = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.userId);
    return success(res, { user });
  } catch (err) {
    return error(res, err.message, 404);
  }
};

module.exports = { register, login, me };
