const jwt = require('jsonwebtoken')
const loadConfig = require('../config')
const config = await loadConfig()
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = config

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, JWT_ACCESS_SECRET, {
    expiresIn: '1y'
  })
}

const generateRefreshToken = (user, jti) => {
  return jwt.sign(
    {
      userId: user.id,
      jti
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: '1y'
    }
  )
}

const generateTokens = (user, jti) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user, jti)

  return {
    accessToken,
    refreshToken
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens
}
