const authTokenModel = require("../model/AuthTokenModel")
const jwt =require("jsonwebtoken")



exports.verifyToken =[(req,res,next)=>{
    // const token = req.header.authorization.split(" ")[1];
const token_text = req.header("authorization");
const token = token_text.split(" ")[1];
console.log(token_text)
if(!token) //if the token is not found 
{
        res.redirect("http://127.0.0.1:8080/auth/insert");
        return res.status(401).json({error:"Token is invalid"}); 
}
else
{
    const decoded = jwt.verify(token,"this can be any random key")
    authTokenModel.findOne({token:token, user:decoded.userid})
    .then((foundToken)=>{
        if(!foundToken){
            // return res.status(401).json({error:"Token is invalid"});  
            return res.redirect("http://127.0.0.1:8080/auth/insert")
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