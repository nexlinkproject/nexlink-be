const express = require('express')
const router = express.Router()
const { authenticate } = require('../utils/middleware')
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController')

router.get('/', authenticate, getUsers)
router.get('/:id', authenticate, getUserById)
router.put('/:id', authenticate, updateUser)
router.delete('/:id', authenticate, deleteUser)

module.exports = router
