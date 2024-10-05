const authTokenModel = require("../model/AuthTokenModel")
const jwt =require("jsonwebtoken")
const UserModel = require("../model/UseModel")
const bcrypt = require('bcrypt')



exports.verifyToken =[(req,res,next)=>{
    // const token = req.header.authorization.split(" ")[1];
const token_text = req.header("authorization");
const token = token_text.split(" ")[1];
console.log(token_text)
if(!token) //if the token is not found 
{
    UserModel.findOne({
        username:req.body.username
    })
    .then(async(users)=>{
        const passwordM = await bcrypt.compare(req.body.password, users.password)
        if(passwordM){
            const token = jwt.sign(
            {
              userid:users._id,//data
              email:users.email     
            },
            "this can be any random key",  //some pass code for token
            {
                expiresIn:"1h"    //configuration
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
    }).catch((err)=>{
        res.send(err.message);
    })

}
else
{
    const decoded = jwt.verify(token,"this can be any random key")
    authTokenModel.findOne({token:token, user:decoded.userid})
    .then((foundToken)=>{
        if(!foundToken){
            return res.status(401).json({error:"Token is invalid"});  

        }
        else
        {
            next()
        }
    }).catch((err)=>{
        res.send(err.message);
    })
   
}

}]