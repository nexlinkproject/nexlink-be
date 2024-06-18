const jwt = require('jsonwebtoken')
const { loadSecrets } = require('../utils/secretManager')

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, loadSecrets("JWT_ACCESS_SECRET"), {
    expiresIn: '1y'
  })
}

const generateRefreshToken = (user, jti) => {
  return jwt.sign(
    {
      userId: user.id,
      jti
    },
    process.env.loadSecrets("JWT_REFRESH_SECRET"),
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
