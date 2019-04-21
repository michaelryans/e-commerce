const ProductController = require('../controllers/product')
const router = require('express').Router()
const {isLogin} = require('../middlewares/authentication')
const {isAuthorizedProduct} = require('../middlewares/authorization')
const {multer, sendUploadToGCS} = require('../middlewares/images')


//get all seller products
router.get('/', ProductController.findAll)
router.get('/seller', isLogin, ProductController.findBySeller)
router.get('/:id', ProductController.findOne)
// router.post('/', ProductController.create)
router.post('/', isLogin, multer.single('file'), sendUploadToGCS, ProductController.create)
// router.patch('/:id', islogin, isAuthorized, ProductController.update)
router.delete('/:id', isLogin, isAuthorizedProduct, ProductController.deleteOne)



module.exports = router