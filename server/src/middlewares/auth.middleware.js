const { verify } = require('../utils/jwt');
const { error } = require('../utils/response');

const authRequired = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return error(res, 'Authentication required', 401);
  try {
    const decoded = verify(token);
    req.user = decoded;
    next();
  } catch (err) {
    return error(res, 'Invalid or expired token', 401);
  }
};

module.exports = { authRequired };
