const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/middleware')
const { login, logout, register, resetPassword } = require('../controllers/authController');

router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/register', register);
router.put('/reset-password', resetPassword);

module.exports = router;
