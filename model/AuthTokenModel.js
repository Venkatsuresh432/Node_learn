const mongoose =require("mongoose")


const AuthTokenSchema = new mongoose.Schema({
    token: {type:String, required:true},
    user:{type:String, required:true}
},
{timestamps:true}    
)

const authTokenModel = mongoose.model("authToken", AuthTokenSchema)

module.exports = authTokenModel;