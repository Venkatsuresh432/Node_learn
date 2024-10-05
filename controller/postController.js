const postModel = require("../model/postModel")
const multer = require('multer')
const path =require('path')
const tagModel= require("../model/tagModel")

// const storage = multer.diskStorage({
//     destination:function(req, file, cb){
//         cb(null, "./public/upload")
//     },
//     filename:function(req, file,cb){
//         cb(null, Date.now()+path.extname(file.originalname))
//     }
    
// })
// const uploader = multer({storage:storage});
// uploader.single("image")
exports.insert=[(req,res)=>{
            
    const post = new postModel({
        title:req.body.title,
        content:req.body.content,
        image:req.body.image,
        // image:req.file ? req.file.filename : null,
        author:req.body.author,
        tags:req.body.tags
    })
    post.save()
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
}]

exports.insertWithTags=[(req,res)=>{        
    const post = new postModel({
        title:req.body.title,
        content:req.body.content,
        image:req.body.image,
        // image:req.file ? req.file.filename : null,
        author:req.body.author,
        tags:req.body.tags
    })
    post.save()
    .then(async (data)  =>{
        // for(let i=0;i<data.tags.length;i++){
        //     tagModel.find({_id:data.tags[i]},{posts:data._id}).then((da)=>{
        //             console.log(da)
        //     })
        // }
        for(let i=0;i<data.tags.length;i++){
           await tagModel.updateOne({_id:data.tags[i]},//criteria or condition
               {
                         $push:{                         // for update an array
                            posts:data._id
                        }
               })// data to update
            .then((da)=>{
                    console.log(da)
            })
        }
        res.send(data)

        // tagModel.updateOne({_id:""})
    }).catch((err)=>{
        res.send(err)
    })
}]

exports.find=[(req,res)=>{
    postModel.find().populate("tags")
    .then((post)=>{
        res.send(post)
    }).catch((err)=>{
        res.send(err)
    })
}]