const express = require('express')
const router = express.Router()
const { login, logout, register, resetPassword } = require('../controllers/authController')
// const { authenticate } = require('../utils/middleware');

router.post('/login', login)
router.post('/logout', logout)
// router.post('/logout', authenticate, logout)
router.post('/register', register)
router.put('/reset-password', resetPassword)

module.exports = router
