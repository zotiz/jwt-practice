const userModel = require('../model/userSchema')
const bcrypt = require('bcrypt')

const generateWebtoken = require('../utls/jwt')

class userController {
  static userRegistration = async (req, res) => {
    const { name, email, password, conform_password, tc } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
      res.json({
        status: 'failed',
        message: 'Email already exists.',
      })
    } else {
      if (name && email && password && conform_password && tc) {
        if (password === conform_password) {
          try {
            const newUser = new userModel({
              name: name,
              email: email,
              password: password,
              tc: tc,
            })
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            //* Update password into hash
            newUser.password = hashPassword
            await newUser.save()
            //! JWT generating
            // const token = jwt.sign(
            //   { userId: newUser._id },
            //   process.env.JWT_SECRET_KEY,
            //   { expiresIn: 36000 },
            // )
            const saved_user = await userModel.findOne({ email })
            const webtoken = generateWebtoken(saved_user)
            res.json({
              status: 'success',
              message: 'Registration successfully',
              webtoken,
            })
          } catch (error) {
            res.json({
              status: 'failed',
              message: error?.message,
            })
          }
        } else {
          res.json({
            status: 'failed',
            message: 'password and conform password does not matched',
          })
        }
      } else {
        res.json({
          status: 'failed',
          message: 'All fields are required',
        })
      }
    }
  }

  static userLogin = async (req, res) => {
    const { email, password } = req.body
    if (email && password) {
      const user = await userModel.findOne({ email })
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (email === user.email && isMatch) {
          // const token = jwt.sign(
          //   { userId: user._id },
          //   process.env.JWT_SECRET_KEY,
          //   { expiresIn: 36000 },
          // )
          const webtoken = generateWebtoken(user)
          res.json({
            status: 'success',
            message: 'Login successfully',
            webtoken,
          })
        } else {
          res.json({
            status: 'failed',
            message: 'Invalid login credential',
          })
        }
      } else {
        res.json({
          status: 'failed',
          message: 'Email is not registered',
        })
      }
    } else {
      res.json({
        status: 'failed',
        message: 'All fields are required',
      })
    }
  }

  static changePassword = async (req, res) => {
    const { password, conform_password } = req.body
    if (password && conform_password) {
      if (password === conform_password) {
        try {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          await userModel.findByIdAndUpdate(req.user._id, {
            $set: {
              password: newHashPassword,
            },
          })
          res.json({
            status: 'success',
            message: 'Password changed successfully.',
          })
        } catch (error) {
          res.json({
            status: 'failed',
            message: error?.message,
          })
        }
      } else {
        res.json({
          status: 'failed',
          message:
            'New password and new conformation password does not matched',
        })
      }
    } else {
      res.json({
        status: 'failed',
        message: 'All fields are required',
      })
    }
  }
}
module.exports = userController
