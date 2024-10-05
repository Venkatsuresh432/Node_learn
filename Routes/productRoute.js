const productController = require("../controller/productController")
const AuthMiddleWare=require("../Middleware/authMiddleware")
const express = require('express')
const router = express.Router()

router.post("/product/insert",productController.insert,(err,data)=>{
    err?res.send(err):res.send(data)
})
router.get("/product/list", AuthMiddleWare.verifyToken, productController.list,(err,data)=>{
    err?res.send(err):res.send(data)
})
router.get("/product/search/:price", productController.findByPrice,(err,data)=>{
    err?res.send(err):res.send(data)
})
router.get("/product/searchLow/:price", productController.findbypriceL,(err,data)=>{
    err?res.send(err):res.send(data)
})
router.get("/product/range/:start/:end",productController.findPriceByRange)
module.exports = router