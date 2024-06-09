const { Users, Tokens } = require('../models')

const createUser = async (userData) => {
  return Users.create(userData)
}

const updateUserPassword = async (user, hashedPassword) => {
  return Users.update({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null })
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

module.exports = { createUser, updateUserPassword, createToken, findRefreshToken }
