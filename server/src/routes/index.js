const express = require('express');
const authRoutes = require('./auth.routes');
const aiRoutes = require('./ai.routes');
const studyRoutes = require("./studyRoutes");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/ai', aiRoutes);
router.use("/study", studyRoutes);

module.exports = router;
