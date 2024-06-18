const jwt = require('jsonwebtoken')
const loadConfig = require('../config')

const generateAccessToken = async (user) => {
  const { JWT_ACCESS_SECRET } = await loadConfig()
  return jwt.sign({ userId: user.id }, JWT_ACCESS_SECRET, {
    expiresIn: '1y'
  })
}

const generateRefreshToken = async (user, jti) => {
  const { JWT_REFRESH_SECRET } = await loadConfig()
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

const generateTokens = async (user, jti) => {
  const accessToken = await generateAccessToken(user)
  const refreshToken = await generateRefreshToken(user, jti)

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