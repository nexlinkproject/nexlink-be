const jwt = require('jsonwebtoken')
const { JWT_ACCESS_SECRET } = require('../config')
const authService = require('../services/authService')
const bcrypt = require('bcryptjs')

const response = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    status: statusCode < 400 ? 'success' : 'error',
    message,
    data
  })
}

const notFound = (req, res, next) => {
  response(res, 404, `${req.originalUrl} Not Found`)
  next()
}

const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    error: err.message
  })
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

  console.log('Token received:', token)

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET)
    const { userId } = decoded
    console.log(decoded)

    const storedToken = await authService.findRefreshToken(userId)
    if (!storedToken || !(bcrypt.compare(token, storedToken.hashedToken))) {
      return response(res, 400, 'Invalid token.')
    }

    req.user = decoded
    return next()
  } catch (error) {
    console.log(error)
    return response(res, 400, 'Validation error.')
  }
}

module.exports = { notFound, response, errorHandler, authenticate }
