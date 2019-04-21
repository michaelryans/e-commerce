const Product = require('../models/product')
const Cart = require('../models/cart')

module.exports = {
    isAuthorizedProduct(req,res,next) {
        // console.log(req.decoded)
        // console.log('req decoded di authorization')

        Product.findOne({
            _id: req.params.id
        })
        .then(found => {
            console.log(found)
            console.log('found --------- product')
            console.log(req.decoded)
            console.log('-------------decoded')
            if(found.seller == req.decoded._id) {
                // console.log('masuk foundddd product')
                next()
            } else {
                res.status(403).json({
                    message:"not authorized"
                }) 
            }
        })
        .catch(err => {
            res.status(403).json({
                message:"product not found"
            }) 
        })
        
        // next()
    },
    isAuthorizedCart(req,res,next) {

        Cart.findOne({
            product: req.params.id
        })
        .then(found => {
            // console.log(found)
            // console.log('found --------- cart')
            if(found.user == req.decoded._id) {
                
                // console.log('masuk if foundddd cart')
                next()
            } else {
                res.status(403).json({
                    message:"not authorized"
                }) 
            }
        })
        .catch(err => {
            res.status(403).json({
                message:"product not found"
            })
        })
    }
}