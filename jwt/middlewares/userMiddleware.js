const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

const checkUserAuthe = async (req, res, next) => {
  let token
  // Get token from headers

  const { authorization } = req.headers

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]

      //* verify Token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)

      // Get user from token
      req.user = await userModel.findById(userId).select('-password')

      next()
    } catch (error) {
      res.json({
        status: 'failed',
        message: 'unauthorize user',
      })
    }
  } else {
    res.json({
      status: 'failed',
      message: 'Unauthorize user, No Token',
    })
  }
}
module.exports = checkUserAuthe
