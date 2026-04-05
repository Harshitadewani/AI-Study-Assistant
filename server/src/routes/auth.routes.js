const express = require('express');
const authController = require('../controllers/auth.controller');
const { authRequired } = require('../middlewares/auth.middleware');
const { validate } = require('../validators/validate.middleware');
const { validateRegister, validateLogin } = require('../validators/auth.validators');

const router = express.Router();

router.post('/register', validate(validateRegister), authController.register);
router.post('/login', validate(validateLogin), authController.login);
router.get('/me', authRequired, authController.me);

module.exports = router;
