const express = require('express')
const router = express.Router();
const tagController = require("../controller/tagController")



router.post("/tags/insert",tagController.insert,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.get("/tags/listall",tagController.list,(err,data)=>{
    err?console.log(err):console.log(data);
})
module.exports = router