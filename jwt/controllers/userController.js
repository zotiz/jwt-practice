const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
class userController {
  //! user registration
  static userRegistration = async (req, res) => {
    const { name, email, password, password_conformation, tc } = req.body
    const user = await userModel.findOne({ email: email })

    if (user) {
      res.status().json({
        status: 'failed',
        message: 'Email already exists',
      })
    } else {
      if (name && email && password && password_conformation && tc) {
        if (password === password_conformation) {
          try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const newUser = new userModel({
              name: name,
              email: email,
              password: hashPassword,
              tc: tc,
            })
            await newUser.save()
            //! Generate Jwt token
            const saved_user = await userModel.findOne({ email: email })
            const token = jwt.sign(
              { userID: saved_user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: '5d' },
            )

            res.status(201).json({
              status: 'success',
              message: 'Registration Success',
              token: token,
            })
          } catch (error) {
            res.json({
              status: 'failed',
              message: 'Unable to register',
            })
          }
        } else {
          res.json({
            status: 'failed',
            message: 'password and conform password does not match.',
          })
        }
      } else {
        res.json({
          status: 'failed',
          message: 'All field required',
        })
      }
    }
  }

  //! user login
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      if (email && password) {
        const user = await userModel.findOne({ email: email })
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password)
          if (isMatch && email === user.email) {
            //! Generate JWT token
            const token = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: '5d' },
            )
            res.status(200).json({
              status: 'success',
              message: 'Login Success',
              token: token,
            })
          } else {
            res.json({
              status: 'failed',
              message: 'Email or password is not valid',
            })
          }
        } else {
          res.json({
            status: 'failed',
            message: 'You are not a registered user.',
          })
        }
      } else {
        res.json({
          status: 'failed',
          message: 'All fields are require',
        })
      }
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'Unable to login',
      })
    }
  }

  //! change password
  static changeUserPassword = async (req, res) => {
    const { password, password_conformation } = req.body
    if (password && password_conformation) {
      if (password === password_conformation) {
        const salt = await bcrypt.genSalt(10)
        const newhashPassword = await bcrypt.hash(password, salt)
        await userModel.findByIdAndUpdate(req.user._id, {
          $set: {
            password: newhashPassword,
          },
        })
        res.json({
          stataus: 'success',
          message: 'password changed succesfully.',
        })
      } else {
        res.json({
          status: 'failed',
          message: 'New password and New conform password doesnot match',
        })
      }
    } else {
      res.json({
        status: 'failed',
        message: 'All fields are required!',
      })
    }
  }

  
}
module.exports = userController
