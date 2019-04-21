const Product = require('../models/product')

class ProductController {

    static create(req,res) {
        // console.log(req.body)
        // console.log('----req.body')
        // console.log(req.file)
        // console.log('----req.file')
        // res.json('yuhuuu')
        console.log(req.body)
        req.body.seller = req.decoded._id
        req.body.imageUrl = req.file.cloudStoragePublicUrl
        Product.create(req.body)
        .then(created => {
            // console.log(created)
            // console.log('-----------------')
            res.status(201).json(created)
            console.log('masuk created')
        })
        .catch(err => {
            err.message = "error register product"
            res.status(500).json(err)
        })
    }


    static findOne(req,res) {
        Product.findOne({
            _id:req.params.id
        })
        .then(found => {
            // console.log(found)
            res.status(200).json(found)
        })
        .catch(err => {
            err.message = "error di findAll product"
            res.status(500).json(err)
        })
    }

    static deleteOne(req,res) {
        Product.findOneAndDelete({
            _id:req.params.id
        })
        .then(deleted => {
            // console.log(deleted)
            // console.log('-------- deleted')

            res.status(200).json({
                deleted: deleted,
                message:'successfully deleted the product'
            })
        })
        .catch(err => {
            res.status(500).json({
                message:"product deletion failed",
                error: err,
            })
        })
    }

    static findBySeller(req,res) {
        Product.find({
            seller: req.decoded._id
        })
        .then(products => {
            res.status(200).json(products)
        })
        .catch(err => {
            res.status(500).json({
                message:"error getting seller product",
                error:err,
            })
        })
    }

    static findAll(req,res) {
        Product.find()
        .then(products => {
            res.status(200).json(products)
        })
        .catch(err => {
            res.status(500).json({
                message:"error getting all product",
                error:err,
            })
        })
    }
}



module.exports = ProductController