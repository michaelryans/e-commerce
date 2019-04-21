const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId, ref: 'Product'
    },
    quantity: {
        type: Number,
        validate: {
            validator(input) {
                return input<= 0? false:true;
            },
            message:"quantity must be greater than 0"
        }
    },
    paid: {
        type:Boolean,
    }

});
const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart