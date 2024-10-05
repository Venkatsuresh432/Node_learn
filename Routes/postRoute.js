const express = require('express')
const router = express.Router();
const postController = require("../controller/postController")



router.post("/post/insert",postController.insert,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.get("/post/listall",postController.find,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.post("/post/inserttags",postController.insertWithTags)
module.exports = router