const { Users } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const { generateTokens } = require('../utils/jwt')
const { v4: uuidv4 } = require('uuid')
const { response } = require('../utils/middleware')
const { Op } = require('sequelize')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await Users.findOne({ where: { email } })

    if (!user) {
      return response(res, 404, 'You are not registered!')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return response(res, 400, 'Your email or password is incorrect!')
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' })
    response(res, 200, 'Login successful', { token })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const logout = (req, res, next) => {
  try {
    response(res, 200, 'Logout successful')
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const register = async (req, res, next) => {
  try {
    const { username, email, password, fullName } = req.body

    const userMatch = await Users.findOne({ where: { email } })
    if (userMatch) {
      return response(res, 400, 'Email already registered!')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await Users.create({ username, email, password: hashedPassword, fullName })

    // const jti = uuidv4()
    // const { refreshToken } = generateTokens(user, jti)
    // const hashedToken = await bcrypt.hash(refreshToken, 10)
    
    // await Tokens.create({ id: jti, hashedToken, userId })

    response(res, 201, 'Users registered successfully', { user })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const { newPassword, token } = req.body

    const user = await Users.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() }
      }
    })

    if (!user) {
      return response(res, 403, 'Password reset token is invalid or has expired')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await user.update({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null })

    response(res, 200, 'Password has been reset')
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

module.exports = { login, logout, register, resetPassword }
