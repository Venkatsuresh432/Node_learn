const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({                       //Schema creat
    username: {type: String, required: true},
    email: {type: String, required: true},
    // contact: [{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"contact"
    // }],
    contact:{type:"String", required:true},
    password: {type: String, required: true},
    // address:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"address"
    // }
},{timestamps: true}) 

const UserModel = mongoose.model("users", userSchema)              //model creat

module.exports = UserModel