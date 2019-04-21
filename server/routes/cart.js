const router = require('express').Router()
const controller = require('../controllers/cart')
const {isLogin} = require('../middlewares/authentication')
const {isAuthorizedCart} = require('../middlewares/authorization')

router.post('/', isLogin, controller.create)
router.get('/', isLogin, controller.findAllByUser)
router.delete('/:id', isLogin, isAuthorizedCart, controller.deleteFromCart)


module.exports = router