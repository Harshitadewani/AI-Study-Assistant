const { connectDB } = require('../db/mongoose');
const startExpress = require('./express');

const bootstrap = async () => {
  await connectDB();
  startExpress();
};

bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});
