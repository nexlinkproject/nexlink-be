const { Users, Tokens } = require('../models');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

const findUserByEmail = async (email) => {
  return Users.findOne({ where: { email } });
};

const createUser = async (userData) => {
  return Users.create(userData);
};

const findUserByResetToken = async (token) => {
  return Users.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { [Op.gt]: new Date() }
    }
  });
};

const updateUserPassword = async (user, hashedPassword) => {
  return user.update({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null });
};

const createToken = async (tokenData) => {
  return Tokens.create(tokenData);
};

const findRefreshToken = async (jti, userId) => {
    return Tokens.findOne({
        where: {
          id: jti,
          userId: userId,
        },
      });
    }
      
module.exports = { findUserByEmail, createUser, findUserByResetToken, updateUserPassword, createToken, findRefreshToken };