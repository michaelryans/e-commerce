const Cart = require('../models/cart')

class CartController {
    static create(req,res) {
        req.body.user = req.decoded._id
        Cart.create(req.body)
        .then(created => {
            res.status(201).json(created)
        })
        .catch(err => {
            res.status(500).json({
                message:"error adding item to cart",
                error:err,
            })
        })
    }

    static findAllByUser(req,res) {
        console.log('masuk findall sini')
        Cart.find({
            user: req.decoded._id,
        })
        .populate('product')
        .then(found => {
            console.log(found)
            res.status(200).json(found)
        })
        .catch(err => {
            res.statis(500).json({
                message:"error when findAllByUser - cart",
                error:err,
            })
        })
    }

    static deleteFromCart(req,res) {
        Cart.findOneAndDelete({
            product:req.params.id
        })
        .then(deleted => {
            res.status(200).json({
                message:"successfully deleted item from cart",
                deleted: deleted,
            })
        })
        .catch(err => {
            res.status(200).json({
                message:"error deleting item from cart",
                error:err,
            })
        })
    }
}

module.exports = CartController