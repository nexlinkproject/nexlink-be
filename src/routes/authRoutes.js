const express = require('express');
const router = express.Router();
const { login, logout, register, forgotPassword, resetPassword } = require('../controllers/authController');

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
