const mongoose =require('mongoose')


const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    desc:{type:String},
    price:{type:String, required:true},
    image:{type:String}
},{timestamps:true})

const ProductModel = mongoose.model("product",productSchema)


module.exports = ProductModel   