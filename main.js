const express = require("express")
const app = express()
const mongoose =require("mongoose")
app.use(express.json())
const port = 8080
const cors= require("cors")
app.use(express.urlencoded())
app.use(cors())

const MONGOOD_URL ="mongodb://127.0.0.1:27017/demo"

mongoose.connect(MONGOOD_URL).then(()=>{
    console.log(`${MONGOOD_URL} connection Successful`);
})
.catch((err)=>{
    console.error("Error in connecting to mongodb",err.message)
})

/*
// how to use router
const UseController = require("./controller/USeController")
const router = express.Router()
app.use(router)
router.post("/users/insert",UseController.insert,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.get("/users/list",UseController.list,(err,data)=>{
    err?console.log(err):console.log(data);
})
    // *****check this part working properly  and comment activate route methods*****
    */


// const UseController = require("./controller/USeController")
// app.post("/users/insert",UseController.insert,(err)=>{
//     if(err){
//         console.log(err.message)
//     }
// })
// app.get("/users/list",UseController.list,(err,data)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log(data)
//         }
// })

// after using router comment that block
// use method 1 or 2

// activate root  method 1
const userRoute =require("./Routes/routes")
app.use(userRoute)

// activate root  method 2
// app.use(require("./Routes/routes"));

app.use(require("./Routes/productRoute"));

app.use(require("./Routes/tagRoutes"));
app.use(require("./Routes/postRoute"));
app.use(require("./Routes/AuthRouter"));

const multer= require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/upload/')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))// appending extension
    } 
})
const uploader = multer({storage:storage});
app.post('/upload/single',uploader.single('uploaded_file'), function(req,res){
    //req.file is the name of your file in the form above ,here"uploaded_file"
    //req.body will hold the text field 
    console.log(req.file,req.body)
    res.status(200).send("file upload sucessfully")
})
app.post('/upload/multiple',uploader.array('uploaded_file', 10),function(req,res){
    console.log(req.files,req.body)
    res.status(200).send("multiple file upload sucessfully")
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})