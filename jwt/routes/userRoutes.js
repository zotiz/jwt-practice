const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
//const checkUserAuthe = require('../middlewares/userMiddleware')
const checkUserAuthentaction = require('../middlewares/userMiddleware')

//* Public Routes

router.post('/register', userController.userRegistration)
router.post('/login', userController.userLogin)
//* Protected Routes
router.post(
  '/changepassword',
  checkUserAuthentaction,
  userController.changeUserPassword,
)

module.exports = router
