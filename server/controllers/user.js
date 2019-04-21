const User = require('../models/user')
const {bcryptHash, bcryptCompare} = require('../helpers/bcrypt')
const {jwtSign} = require('../helpers/jwt')

class UserController {
    static create(req,res) {
        // console.log(req.body)
        req.body.password = bcryptHash(req.body.password)
        User.create(req.body)
        .then(created => {
            //console.log('----created')
            // console.log(created)
            res.status(201).json(created)
        })
        .catch(err => {
            // console.log(err)
            // console.log('----error create')
            // console.log(err)
            // if(!err.email.message) {
            //     err.message = err.email.message
            // }
            res.status(500).json(err)
        })
    }

    static login(req,res) {
        User.findOne({
            email:req.body.email
        })
        .then(found => {
            if(found) {
                const compared = bcryptCompare(req.body.password, found.password)
                if(compared) {
                    const token = jwtSign({
                        _id:found._id,
                        email: found.email,
                        name: found.name,
                    })
                    res.status(200).json({token})
                } else {
                    res.status(401).json({message:"wrong email/password"})
                }
            } else {
                console.log('masuk else login')
                res.status(401).json({message:"wrong email/password"})
            }
        })
        .catch(err => {
            console.log(err)
            console.log('masuk catch login')
            res.status(401).json({
                error:err,
                message:"wrong email/password"
            })
        })
    }

    // static addToCart(req,res) {
    //     // console.log('masuk sini')
    //     console.log('----reqbody')
    //     console.log(req.body)

    //     User.findOneAndUpdate({
    //         _id:req.decoded._id
    //     }, {cart: ['test']}, {new:true})
    //     .then(updated => {
    //         console.log(updated)
    //         res.status(200).json(updated)
    //     })
    //     .catch(err => {
    //         res.status(500).json({
    //             message:"error di add item to cart",
    //             error:err,
    //         })
    //     })

    // }
}


module.exports = UserController