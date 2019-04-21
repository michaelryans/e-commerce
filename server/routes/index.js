const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')
const cartRouter = require('./cart')

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/cart', cartRouter)

module.exports = router