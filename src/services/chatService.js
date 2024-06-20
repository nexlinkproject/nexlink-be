const { Chats, ChatsUsers, Users } = require('../models')

const createGroupChat = async (userId, groupName, members, chatType) => {
  try {
    const chat = await Chats.create({
      name: groupName,
      userId,
      chatType
    });

    // prepare associations
    const memberAssociations = members.map(memberId => ({
      userId: memberId,
      chatId: chat.id
    }));

    // insert member
    await ChatsUsers.bulkCreate(memberAssociations);

    return chat;
  } catch (error) {
    console.error('Error creating group chat:', error);
    throw error;
  }
};

const deleteGroupChat = async (groupId) => {
  await Chats.destroy({
    where: { id: groupId }
  })
}

const getAllGroups = async (page, take, userId) => {
  const offset = (page - 1) * take
  const groups = await Chats.findAll({
    include: [
      {
        model: Users,
        through: { attributes: [] },
        where: { id: userId },
        attributes: ['id', 'username', 'email']
      }
    ],
    offset,
    limit: take
  })
  return groups
}

const getGroupChat = async (groupId, page, take) => {
  const offset = (page - 1) * take
  const group = await Chats.findAll({
    where: { groupId },
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

const createChatByGroup = async (message, userId, groupId, chatType) => {
  try {
    const chat = await Chats.create({
      message,
      userId,
      groupId,
      chatType
    });

    await ChatsUsers.create({
      userId,
      chatId: chat.id
    });

    return chat;
  } catch (error) {
    console.error('Error creating chat by group:', error);
    throw error;
  }
};

module.exports = {
  createGroupChat,
  deleteGroupChat,
  getAllGroups,
  getGroupChat,
  createChatByGroup
}
