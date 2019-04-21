const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema ({
    name: {
        type:String,
        required: [true, 'product name must be filled']
    },
    price: {
        type:Number,
        required: [true, 'product price must be filled'],
        validate: [
            {
            validator(input) {
                return input <= 0? false : true;
            },
            message:"cannot input negative price"
        }, ]
        // { //cannot input 
        //     validator(input) {
        //         return isNaN(input)?false:true;
        //     },
        //     message:"input must be number"
        // }]
    },
    imageUrl: String,
    stock: {
        type: Number,
        required:[true, 'stock must be filled'],
        validate: [{
            validator(input) {
                return input <= 0 ? false: true;
            },
            message:"cannot input negative stock"
        },]
        // {
        //     validator(input) {
        //         return isNaN(input)? false:true;
        //     },
        //     message:"must input number to stock"
        // }]
    },
    seller: {type:Schema.Types.ObjectId, ref:'User'}
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product;