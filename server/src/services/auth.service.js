const User = require('../models/User');
const { hash, compare } = require('../utils/password');
const { sign } = require('../utils/jwt');

const register = async ({ email, password, name }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already registered');
  const passwordHash = await hash(password);
  const user = await User.create({ email, passwordHash, name });
  const token = sign({ userId: user._id });
  return { user: toPublic(user), token };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');
  const valid = await compare(password, user.passwordHash);
  if (!valid) throw new Error('Invalid email or password');
  const token = sign({ userId: user._id });
  return { user: toPublic(user), token };
};

const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  return toPublic(user);
};

const toPublic = (user) => ({
  id: user._id,
  email: user.email,
  name: user.name,
});

module.exports = { register, login, getMe };
