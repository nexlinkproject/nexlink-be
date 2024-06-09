const chatService = require('../services/chatService')
const { requireAuthenticatedWebSocket } = require('../utils/middleware')
const { response } = require('../utils/middleware')

const createGroupChat = async (req, res, next) => {
  try {
    const { userId } = req
    const { groupName, members, chatType } = req.body
    const group = await chatService.createGroupChat(userId, groupName, members, chatType)
    response(res, 201, 'New Group Chat has been created', group)
  } catch (err) {
    next(err)
  }
}

const deleteGroupChat = async (req, res, next) => {
  try {
    const groupId = parseInt(req.params.groupId, 10)
    await chatService.deleteGroupChat(groupId)
    response(res, 200, `Group Chat with id ${groupId} has been deleted`)
  } catch (err) {
    next(err)
  }
}

const getAllGroups = async (req, res, next) => {
  try {
    const { userId } = req.user
    let { page, take } = req.query
    page = parseInt(page) || 1
    take = parseInt(take) || 5
    const groups = await chatService.getAllGroups(page, take, userId)
    response(res, 200, 'Your Group Chat with the latest chat has been retrieved', groups)
  } catch (err) {
    next(err)
  }
}

const getGroupChat = async (req, res, next) => {
  try {
    const { groupId } = req.params
    let { page, take } = req.query
    page = parseInt(page) || 1
    take = parseInt(take) || 5
    const group = await chatService.getGroupChat(groupId, page, take)
    response(res, 200, `GroupChat with id ${groupId} has been retrieved`, group)
  } catch (err) {
    next(err)
  }
}

const sendMessage = async (req, res, next) => {
  try {
    const { userId } = req.user
    const { groupId } = req.params
    const { message, chatType } = req.body
    console.log(userId, groupId, message, chatType )
    const chat = await chatService.createChatByGroup(message, userId, groupId, chatType)
    response(res, 201, 'New message has been created', chat)
  } catch (err) {
    next(err)
  }
}

const socketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('createGroupChat', async (data) => {
      try {
        const { token, groupName, members } = data
        if (!token) throw new Error('Token is missing')
        const userId = await requireAuthenticatedWebSocket(token)
        if (userId) {
          const group = await chatService.createGroupChat(userId, groupName, members)
          socket.emit('groupChatCreated', {
            data: group,
            message: 'New Group Chat has been created',
            status: true
          })
        } else {
          throw new Error('Unauthorized')
        }
      } catch (err) {
        socket.emit('groupChatCreationError', { message: err.message })
      }
    })

    socket.on('getGroupChat', async (data) => {
      try {
        const { token, groupId, page, take } = data
        if (!token) throw new Error('Token is missing')
        const userId = await requireAuthenticatedWebSocket(token)
        if (userId) {
          const group = groupId
            ? await chatService.getGroupChat(groupId, page || 1, take || 5)
            : await chatService.getAllGroups(page || 1, take || 5, userId)
          socket.emit('groupChat', {
            data: group,
            message: groupId ? `GroupChat with id ${groupId} has been retrieved` : 'Your Group Chat with the latest chat has been retrieved',
            status: true
          })
        } else {
          throw new Error('Unauthorized')
        }
      } catch (err) {
        socket.emit('errorRetrievingGroupChat', { message: err.message })
      }
    })

    socket.on('sendMessage', async (data) => {
      try {
        const { token, message, groupId } = data
        if (!token) throw new Error('Token is missing')
        const userId = await requireAuthenticatedWebSocket(token)
        if (userId) {
          const chat = await chatService.createChatByGroup(message, userId, groupId)
          socket.emit('messageSent', {
            data: chat,
            message: 'New message has been created',
            status: true
          })
        } else {
          throw new Error('Unauthorized')
        }
      } catch (err) {
        socket.emit('messageError', { message: err.message })
      }
    })

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected')
    })
  })
}

module.exports = {
  createGroupChat,
  deleteGroupChat,
  getAllGroups,
  getGroupChat,
  sendMessage,
  socketHandlers
}
