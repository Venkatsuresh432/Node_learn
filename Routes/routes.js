const express = require("express")
// const app = express()



const UseController = require("../controller/USeController")
const router = express.Router()
// app.use(router)
router.post("/users/insert",UseController.insert,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.post("/users/insert/address",UseController.insertWithAddress,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.post("/users/insertA",UseController.insertAddress,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.post("/users/insert/contact",UseController.insertWithContact,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.get("/users/list",UseController.list,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.post("/users/login",UseController.login,(err,data)=>{
    err?console.log(err):console.log(data)
})
router.delete("/users/delete/:id",UseController.delete,(err,data)=>{
    err?console.log(err):console.log(data)
})
router.get("/users/listPage",UseController.userPage,(err,data)=>{
    err?console.log(err):console.log(data);
})

module.exports = router