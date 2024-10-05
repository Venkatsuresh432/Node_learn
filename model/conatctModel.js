const mongoose = require('mongoose')

const contactSchema= new mongoose.Schema({
    type:{type:String,required:true},
    data:{type:String,required:true}

},{timestamps:true})

const contactModel = mongoose.model("contact", contactSchema)

module.exports = contactModel