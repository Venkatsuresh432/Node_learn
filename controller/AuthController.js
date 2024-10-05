const UserModel = require("../model/UseModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authTokenModel = require("../model/AuthTokenModel")

exports.insert = [async(req,res)=>{      
    //creating the object with request data received
    const hashPasswd = await bcrypt.hash(req.body.password, 12)
    const user = new UserModel({    
        username:  req.body.username,
        email:     req.body.email,
        contact:   req.body.contact,
        password:  hashPasswd
    })
    //save the object 
    user.save()
    .then((saveduser)=>{          //if saving is successful
        res.send(saveduser)
    })
    .catch((err)=>{               //if saving is not successful
        res.send(err)
        console.log("error occured" + err)
    })
}]
exports.listA = [(req,res)=>{
    UserModel.findOne({
        username:req.body.username
    }) 
    .then(async(users)=>{
        const passwordM = await bcrypt.compare(req.body.password, users.password)
        if(passwordM){
            const token = jwt.sign(
            {
              userid : users._id,//data
              email : users.email     
            },
            "this can be any random key",  //some pass code for token
            {
                expiresIn : "1h"    //configuration
            });
                        const authToken = new authTokenModel({
                            token:token,
                            user:users._id
                        })
                        authToken.save()
                        .then((savedToken)=>{
                            console.log(savedToken)
                            res.send({token:token});
                        }).catch((err)=>{
                            res.send(err)
                        })
            
        }
        else{
            res.send(false)
        }   
    })
    .catch((err)=>{
        res.send(err)
        console.log("error occured")
    })
}]




// exports.listA = [(req,res)=>{
//     UserModel.findOne({
//         username:req.body.username
    
//     }) // return multiple objects in an array
//     // UserModel.find().populate("address")
//     // UserModel.find().populate(["address", "contact"])
//     .then(async(users)=>{
//         const passwordM = await bcrypt.compare(req.body.password, users.password)
//         if(passwordM){
//             const token = jwt.sign(
//             {
//               userid:users._id,//data
//               email:users.email     
//             },
//             "this can be any random key",  //some pass code for token
//             {
//                 expiresIn:"1h"    //configuration
//             });
//             res.send({token:token});
//         }
//         else{
//             res.send(false)
//         }
        
//         // users? res.send(users) : res.send(false)     
//     })
//     .catch((err)=>{
//         res.send(err)
//         console.log("error occured")
//     })
// }]