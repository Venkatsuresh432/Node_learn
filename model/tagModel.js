const mongoose = require('mongoose')

const tagSchema= new mongoose.Schema({
    text:{type:String,required:true},
    code:{type:String,required:true},
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }]
},{timestamps:true})


const tagModel = mongoose.model("tags", tagSchema)

module.exports = tagModel