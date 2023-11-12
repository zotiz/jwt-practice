const jwt = require('jsonwebtoken')
const userModule = require('../model/userSchema')
const checkUserAuthe = async (req, res, next) => {
  let getToken
  // Get token from headers

  const { authorization } = req.headers

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      getToken = authorization.split(' ')[1]

      const { userId } = jwt.verify(getToken, process.env.JWT_SECRET_KEY)

      const user = await userModule.findById(userId).select('-password')
      req.user = user

      // Get user from token
      //req.user = await userModel.findById(userId).select('-password')

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
