const tagModel =require("../model/tagModel")


exports.insert=[(req,res)=>{
   const blog =new tagModel({
            text:req.body.text,
            code:req.body.code
   })
   blog.save().then((tags)=>{
            res.send(tags)
   }).catch((err)=>{
    res.send(err)
   })
}]

exports.list=[(req,res)=>{
    tagModel.find().populate("posts")
    .then((data)=>{
            res.send(data)
    }).catch((err)=>{
        res.send("error occured",err)
    })
}]