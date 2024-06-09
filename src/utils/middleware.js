const jwt = require('jsonwebtoken')
const { JWT_ACCESS_SECRET } = require('../config')
const authService = require('../services/authService')
const bcrypt = require('bcryptjs')
const Users = require('../models/usersModel')

const response = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({ status: statusCode < 400 ? 'success' : 'error', message, data })
}

const notFound = (req, res, next) => {
  response(res, 404, `${req.originalUrl} Not Found`)
  next()
}

const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ status: 'error', message: 'Internal Server Error', error: err.message })
  next()
}

const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization')
  if (!authHeader) {
    return response(res, 401, 'Access denied. No token provided.')
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return response(res, 401, 'Access denied. No token provided.')
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET)
    const { userId } = decoded

    const storedToken = await authService.findRefreshToken(userId)
    if (!storedToken || !(await bcrypt.compare(token, storedToken.hashedToken))) {
      return response(res, 400, 'Invalid token.')
    }

    req.user = decoded
    return next()
  } catch (error) {
    console.log(error)
    return response(res, 400, 'Validation error.')
  }
}

const authenticateWebsocket = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await Users.findByPk(decoded.userId)
    return user ? user.id : null
  } catch (err) {
    console.error(err)
    return null
  }
}

module.exports = { notFound, response, errorHandler, authenticate, authenticateWebsocket }
