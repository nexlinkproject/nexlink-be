const { Users } = require('../models')

const findAllUsers = async () => {
  return await Users.findAll()
}

const findUserById = async (id) => {
  return await Users.findByPk(id)
}

const findUserByEmail = async (email) => {
  return await Users.findOne({ where: { email } })
}

const updateUser = async (id, userData) => {
  return await Users.update(userData, { where: { id } })
}

const deleteUser = async (id) => {
  return Users.destroy({ where: { id } })
}

module.exports = {
  findAllUsers,
  findUserById,
  findUserByEmail,
  updateUser,
  deleteUser
}
