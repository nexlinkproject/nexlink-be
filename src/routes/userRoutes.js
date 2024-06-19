const express = require('express')
const router = express.Router()
const { authenticate } = require('../utils/middleware')
const { upload } = require('../utils/multer')
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController')

router.get('/', authenticate, getUsers)
router.get('/:id', authenticate, getUserById)
router.put('/:id', authenticate, upload.single('profilePicture'), updateUser)
router.delete('/:id', authenticate, deleteUser)

module.exports = router
