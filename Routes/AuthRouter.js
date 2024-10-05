const express = require('express')
const router = express.Router();
const authc = require("../controller/AuthController")


router.post("/auth/insert",authc.insert,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.post("/auth/login",authc.listA,(err,data)=>{
    err?console.log(err):console.log(data);
})

module.exports = router