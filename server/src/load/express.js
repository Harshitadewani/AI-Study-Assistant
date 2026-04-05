const express = require('express');
const cors = require('cors');
const app = require('../app/app');
const routes = require('../routes');
const config = require('../config');
const { errorHandler } = require('../middlewares/error.middleware');

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  config.clientOrigin,
].filter(Boolean);
app.use(cors({
  origin: (origin, cb) => (allowedOrigins.includes(origin) || !origin ? cb(null, true) : cb(null, false)),
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.use(errorHandler);

module.exports = (callback) => {
  const server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    callback?.(server);
  });
  return server;
};
