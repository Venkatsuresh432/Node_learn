const UserModel= require("../model/UseModel")
const{body} =require("express-validator")

exports.insert=[
// req.body.username  trim cutdown empty space length:give min max length message :"if not satisfied condition message will be popup"
body("username").trim().isLength({min:5}).withMessage("username cannot be empty"),
body("email").trim().isEmail().withMessage("email will not correctly fitted"),
body("username").trim().custom((value)=>{
     return UserModel.findOne({username:value})
       .then((users)=>{
           if(users!=null){
               return Promise.reject("username already exists")
           }
       })
}),
body("email").trim().custom((value)=>{
   return UserModel.findOne({email:value})
   .then((users)=>{
       if(users!=null){
           return Promise.reject("email already exists")
       }
   })
})
]

