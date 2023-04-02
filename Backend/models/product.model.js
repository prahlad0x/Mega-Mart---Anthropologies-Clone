const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title : String,
    price : String,
    image : String,
    quantity : Number,
    type : String
})


const ProductModel = mongoose.model('product', productSchema)

module.exports = {ProductModel}