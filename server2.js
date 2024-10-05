// import an express js library
const express = require("express")
//creater an express app
// initiate the express app
const app = express();
//middleware for access data from post method
app.use(express.json());
app.use(express.urlencoded());
// middleware for send videos photos etc
app.use("/files", express.static(__dirname + "/public"))
// console.log(__dirname);
//configure method and url for http request and response
app.get("/sayHi", (req, res) =>{
        res.send("hello world");
})
app.post("/num", (req,res)=>{
    res.send(" "+Math.random())
})
app.get("/user",(req,res)=>{
    const user={
        name:"hari",
        age:12,
        gender:"Male"
    }
    res.send(user);     
})
// app.get("/login", (req,res)=>{
//     const username = req.query.username
//     const userpwd = req.query.userpwd
   
//     if(username === "admin" && userpwd === "12345")
//     {
//         res.send("login Sucess!");
//     }  
//     res.send("Data Recived");
//     console.log(username,userpwd)
// })
app.post("/login", (req,res)=>{
    const username = req.body.username
    const userpwd = req.body.userpwd
   
    if(username === "admin" && userpwd === "12345")
    {
        res.send("login Sucess!");
        console.log(username,userpwd)
    } 
    else
    {
        res.send("Data Recived");
        console.log(username,userpwd)
    } 
})

const users= [
    {
        id:"0",
        name:"hari"
    },
    {
        "id":"1",
        "name":"krishna"
    },
    {
        "id":"2",
        "name":"sai"
    }
]
    //path variable
app.get("/getuser/:id",(req,res)=>{
    const id =req.params.id;
    res.send(users[id])
})
//make a server listen to a port
app.listen("4000",()=>{
        console.log("Server listening to the port....");
})