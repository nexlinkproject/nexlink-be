const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

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

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    return response(res, 401, 'Access denied. No token provided.')
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (ex) {
    response(res, 400, 'Invalid token.')
  }
  return next
}

module.exports = { notFound, response, errorHandler, authenticate }
