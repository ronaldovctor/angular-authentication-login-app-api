const express = require('express')
const router = express.Router()
const PersonController = require('../controllers/PersonController')
const ProductController = require('../controllers/ProductController')
const AuthController = require('../controllers/AuthController')

router.use(AuthController.controller.check_token)
router.get('/people', PersonController.controller.all)
router.get('/products', ProductController.controller.all)

module.exports = router