const { Users, Tokens } = require('../models')

const findUserByEmail = async (email) => {
  return Users.findOne({ where: { email } })
}

const createUser = async (userData) => {
  return Users.create(userData)
}

const findUserById = async (id) => {
  return Users.findOne({ where: { id } })
}

const updateUserPassword = async (user, hashedPassword) => {
  return user.update({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null })
}

const createToken = async (tokenData) => {
  return Tokens.create(tokenData)
}

const findRefreshToken = async (userId) => {
  return Tokens.findOne({
    where: {
      userId
    }
  })
}

module.exports = { findUserByEmail, createUser, findUserById, updateUserPassword, createToken, findRefreshToken }
