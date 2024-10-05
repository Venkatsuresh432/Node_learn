const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
    plotno:{type:String, required:true},
    street:{type:String,required:true},
    city:{type:String,required:true},
    landmark:{type:String},
    pincode:{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true}
})

const AddressModel = mongoose.model("address", AddressSchema)

module.exports = AddressModel