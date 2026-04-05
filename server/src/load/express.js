const express = require('express');
const cors = require('cors');
const app = require('../app/app');
const routes = require('../routes');
const config = require('../config');
const { errorHandler } = require('../middlewares/error.middleware');

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

module.exports = (callback) => {
  const server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    callback?.(server);
  });
  return server;
};