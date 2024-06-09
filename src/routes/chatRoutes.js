const express = require('express')
const router = express.Router()
const { createGroupChat, deleteGroupChat, getAllGroups, getGroupChat, sendMessage } = require('../controllers/chatController')
const { authenticate } = require('../utils/middleware')

router.post('/groups', authenticate, createGroupChat)
router.delete('/groups/:groupId', authenticate, deleteGroupChat)
router.get('/', authenticate, getAllGroups)
router.get('/groups/:groupId', authenticate, getGroupChat)
router.post('/groups/:groupId/message', authenticate, sendMessage)

module.exports = router
