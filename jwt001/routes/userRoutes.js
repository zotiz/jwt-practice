const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()
const checkUserAuth = require('../middleware/userMiddleware')
// public routes
router.post('/api/user/register', userController.userRegistration)
router.post('/api/user/login', userController.userLogin)

// protected routes
router.post('/api/user/changepassword',checkUserAuth, userController.changePassword)
module.exports = router
