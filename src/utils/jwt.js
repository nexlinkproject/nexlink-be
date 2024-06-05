const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET } = require('../config')

const  generateAccessToken = (user) => {
  console.log(user, 'this user');
  return jwt.sign({ userId: user.id }, JWT_ACCESS_SECRET, {
    expiresIn: '1y',
  });
}

const generateRefreshToken = (user, jti) => {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '1y',
    },
  );
}

const generateTokens = (user, jti) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
