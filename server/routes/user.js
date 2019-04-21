const UserController = require('../controllers/user')
const router = require('express').Router()
const {isLogin} = require('../middlewares/authentication')
const {isAuthorized} = require('../middlewares/authorization')

router.post('/register', UserController.create)
router.post('/login', UserController.login)

module.exports = router