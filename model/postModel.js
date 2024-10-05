const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
    image:{type:String},
    author:{type:String},
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tags"
    }]
},{timestamps:true})

const postModel = mongoose.model("post", postSchema)

module.exports =  postModel

//extended to tag model 

//method 2
// const postModel = mongoose.model("post", new mongoose.Schema({
//     title:{type:String, required:true},
//     content:{type:String, required:true},
//     image:{type:String},
//     author:{type:String}
// },{timestamps:true}) )
// module.exports =  postModel