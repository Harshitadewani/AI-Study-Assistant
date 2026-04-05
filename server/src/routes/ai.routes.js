const express = require('express');
const aiController = require('../controllers/ai.controller');
const { authRequired } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/chat', authRequired, aiController.chat);
router.post('/summarize', authRequired, aiController.summarize);

module.exports = router;
