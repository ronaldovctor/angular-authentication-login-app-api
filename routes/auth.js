const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.post('/login', AuthController.controller.login)
router.post('/register', AuthController.controller.register)

router.use(AuthController.controller.check_token)
router.get('/user', AuthController.controller.user_data)

module.exports = router