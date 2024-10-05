// import an express js library
const express = require("express")
//creater an express app
// initiate the express app
const app = express();
//configure method and url for http request and response
app.get("/sayHi", (req, res) =>{
        res.send("hello world");
})
app.get("/num", (req,res)=>{
    res.send(" "+Math.random())
})
app.get("/muser",(req,res)=>{
    const user={
        name:"hari",
        age:12,
        gender:"Male"
    }
    res.send(user);     
})
//make a server listen to a port
app.listen("8080",()=>{
        console.log("Server listening to the port....");
})
// get can only use for show output on browser
/*
(url +method)
http method
GET =>  default method 
POST
PUT
DELETE
PATCH
OPTION
*/