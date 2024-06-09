const { Chats, ChatsUsers, Users } = require('../models')

const createGroupChat = async (userId) => {
  const chat = await Chats.create({
    message: '',
    userId,
    groupId: null
  })
  await ChatsUsers.create({
    userId,
    chatId: chat.id
  })
  return chat
}

const deleteGroupChat = async (groupId) => {
  await Chats.destroy({
    where: { id: groupId }
  })
}

const getAllGroups = async (page, take, userId) => {
  const offset = (page - 1) * take
  const groups = await ChatsUsers.findAll({
    where: { userId },
    include: [
      {
        model: Chats,
        include: [Users]
      }
    ],
    offset,
    limit: take
  })
  return groups
}

const getGroupChat = async (groupId, page, take) => {
  const offset = (page - 1) * take
  const group = await Chats.findOne({
    where: { id: groupId },
    include: [
      {
        model: Users
      }
    ],
    offset,
    limit: take
  })
  return group
}

const createChatByGroup = async (message, userId, groupId) => {
  const chat = await Chats.create({
    message,
    userId,
    groupId
  })
  await ChatsUsers.create({
    userId,
    chatId: chat.id
  })
  return chat
}

module.exports = {
  createGroupChat,
  deleteGroupChat,
  getAllGroups,
  getGroupChat,
  createChatByGroup
}
