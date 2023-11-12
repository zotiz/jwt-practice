const mongoose = require('mongoose')
//schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  tc: {
    type: Boolean,
    required: true,
  },
})
// Model

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
