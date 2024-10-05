const productModel = require("../model/productModel")


const express = require('express')
const router= express.Router()



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

exports.insert=[
    // getting image using multer
    uploader.single("image"),
    (req,res)=>{
    const prod= new productModel({
        name:req.body.name,
        desc:req.body.desc,
        price:req.body.price,
        // validate image using ternary operator
        image:req.file ? req.file.filename : null
    })
    prod.save().then((savedProduct)=>{
            res.send(savedProduct);
    }).catch((err)=>{
            res.send(err)
    })
}]

exports.list=[(req,res)=>{
    productModel.find()
    .then((prod)=>{
        res.send(prod)
        // console.log(prod)
    }).catch((err)=>{
        res.send(err)
    })
}]


exports.findByPrice=[(req,res)=>{
    productModel.find({
        price:{$gt : req.params.price}
    }).then((datas)=>{
        res.send(datas)
    }).catch((err)=>{
        res.send(err)
    })
}]
exports.findbypriceL=[(req,res)=>{
    productModel.find({
        price:{$lt:req.params.price}
    }).then((datas)=>{
        res.send(datas)
    }).catch((err)=>{
        res.send(err)
    })
}]

exports.findPriceByRange=[(req,res)=>{
    productModel.find({
        $and:{
            price: {
                $gt:req.params.start,
                $lt:req.params.end
            }
        }
    }).then((datas)=>{
        res.send(datas)
    }).catch((err)=>{
        res.send(err)
    })
}]