import mongoose, { trusted } from "mongoose";

const productSchema = new  mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

const Product = mongoose.model('Product', productSchema)

export default Product;