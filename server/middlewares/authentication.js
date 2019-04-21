const {jwtVerify, jwtSign} = require('../helpers/jwt')
const User = require('../models/user')

module.exports = {
    isLogin(req,res,next) {
        try {
            const decoded = jwtVerify(req.headers.token)
            User.findOne({
                _id:decoded._id
            })
            .then(found => {
                if(found._id = decoded._id) {
                    req.decoded = decoded
                    next()
                } else {
                    res.status(401).json({
                        message:"authentication failed"
                    })
                }
            })
            .catch(err => {
                res.status(401).json({
                    message:"invalid token"
                })
            })
        }
        catch {
            res.status(401).json({
                message:"authentication failed"
            })
        }
    }
}