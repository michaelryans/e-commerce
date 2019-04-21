const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: {
        type: String,
        validate: [{
            validator: function (email) {
                const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                return regex.test(email)
            },
            message: "invalid email address"
        },{
            validator: function (email) {
                return User.findOne({
                    email:email
                })
                .then(found => {
                    console.log('fonud----')
                    console.log(found)
                    if(found != null && found.email === email) return false
                })
            }
        }]
    },
    password: {
        type: String,
    },
    name: {
        type:String,
    },
    address: {
        type: String,
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User