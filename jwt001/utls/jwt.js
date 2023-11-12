
const jwt = require('jsonwebtoken')

const generateWebtoken = (user)=>{
  const USERID = {
    userId : user._id
  }
  const token = jwt.sign(
          USERID,
           process.env.JWT_SECRET_KEY,
          { expiresIn: 36000 },
          )
          return token
}

module.exports = generateWebtoken