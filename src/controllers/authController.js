const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken');
const { generateTokens } = require('../utils/jwt')
const { v4: uuidv4 } = require('uuid')
const { response } = require('../utils/middleware')
// const { Op } = require('sequelize');
const authService = require('../services/authService')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await authService.findUserByEmail(email)

    if (!user) {
      return response(res, 404, 'You are not registered!')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return response(res, 400, 'Your email or password is incorrect!')
    }

    const jti = uuidv4()
    const { accessToken, refreshToken } = generateTokens(user, jti)
    await authService.addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: user.id
    })

    response(res, 200, 'Login successful', { accessToken, refreshToken })
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

    const userMatch = await authService.findUserByEmail(email)
    if (userMatch) {
      return response(res, 400, 'Email already registered!')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await authService.createUser({ username, email, password: hashedPassword, fullName })

    const jti = uuidv4()
    const { refreshToken } = generateTokens(user, jti)
    console.log(`Receive token:${refreshToken}`)
    const hashedToken = await bcrypt.hash(refreshToken, 10)

    await authService.createToken({ id: jti, hashedToken, userId: user.id })

    response(res, 201, 'User registered successfully', { user })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const { newPassword, token } = req.body

    const user = await authService.findUserByResetToken(token)

    if (!user) {
      return response(res, 403, 'Password reset token is invalid or has expired')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await authService.updateUserPassword(user, hashedPassword)

    response(res, 200, 'Password has been reset')
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

module.exports = { login, logout, register, resetPassword }
