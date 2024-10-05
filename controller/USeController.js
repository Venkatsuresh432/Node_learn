const UserModel = require("../model/UseModel")
const AddressModel = require("../model/addressModel")
const contactModel = require("../model/conatctModel")
const{body, validationResult} = require('express-validator')
const userValidator = require("../Validators/userValidator")



exports.insert = [ 
     userValidator.insert,
    (req,res)=>{
        const error =  validationResult(req)
        console.log(error.array())
        if(error.isEmpty()){
           //creating the object with request data received
                        const user = new UserModel({
                            username:  req.body.username,
                            email:     req.body.email,
                            contact:   req.body.contact,
                            password:  req.body.password
                        })
                        //save the object 
                        user.save()
                        .then((saveduser)=>{          //if saving is successful
                            res.send(saveduser)
                        })
                        .catch((err)=>{               //if saving is not successful
                            res.send(err)
                            console.log("error occured" + err)
                        })
        } 
        else
        {
            res.send(error.array())
        }      
    
}]


exports.insertWithContact=[ async (req,res)=>{
    const rContacts = req.body.contact
        let savedContactid = []
                // rContacts.map((e)=>{
                    for(let i = 0;i<rContacts.length;i++){
                        const e = rContacts[i]
                        const contact = new contactModel({
                            data:e.data,
                            type:e.type
                        })
                    await contact.save().then((savedCont)=>{
                    savedContactid.push(savedCont._id)
                })
                    }
                 
        // })
        const user = new UserModel({
            username:  req.body.username,
            contact :   savedContactid,
            password:  req.body.password
        })
        //save the object
        user.save()
        .then((saveduser)=>{          //if saving is successful
            res.send(saveduser)
        })
        .catch((err)=>{               //if saving is not successful
            res.send(err)
            console.log("error occured" + err)
        })
}]

exports.insertWithAddress = [(req,res)=>{      
    //creating the object with request data received
    const address = new AddressModel({
        plotno:  req.body.address.plotno,
        street:  req.body.address.street,
        city:    req.body.address.city,
        landmark:req.body.address.landmark,
        pincode: req.body.address.pincode,
        state:   req.body.address.state,
        country: req.body.address.country
    })  
    address.save()
    .then((SavedAddress)=>{ 
        const user = new UserModel({
            username:  req.body.username,
            email:     req.body.email,
            contact:   req.body.contact,
            password:  req.body.password,
            address:   SavedAddress._id
        })
        user.save()
        .then((saveduser)=>{          //if saving is successful
            res.send(saveduser)
            console.log(saveduser)
        })
        .catch((err)=>{               //if saving is not successful
            res.send(err)
            console.log("error occured"+ err)
        })
    })
    .catch((err)=>{               //if saving is not successful
        res.send(err)
        console.log("error occured"+ err)
    })
    
}]
exports.insertAddress = [(req,res)=>{      
    //creating the object with request data received
    const user = new UserModel({
        username:  req.body.username,
        email   :  req.body.email,
        contact :  req.body.contact,
        password:  req.body.password,
        address :   savead._id
    })
    user.save()
    .then((saveduser)=>{ 
        const address = new AddressModel({
            plotno:  req.body.address.plotno,
            street:  req.body.address.street,
            city:    req.body.address.city,
            landmark:req.body.address.landmark,
            pincode: req.body.address.pincode,
            state:   req.body.address.state,
            country: req.body.address.country
        }) 
        let savead = null 
        address.save().then((saddress)=>{
            savead = saddress 
        })   //if saving is successful
        // res.send(saveduser)
    })
    .catch((err)=>{               //if saving is not successful
        res.send(err)
        console.log("error occured" + err)
    })
}]



exports.list = [(req,res)=>{
        // UserModel.find() // return multiple objects in an array
        UserModel.find().populate("address")
        UserModel.find().populate(["address", "contact"])
        .then((users)=>{
            res.send(users)
            console.log(users)      
        })
        .catch((err)=>{
            res.send(err)
            console.log("error occured")
        })
}]
exports.userPage=[(req,res)=>
{
    //let get page or change as default 1
    let page = parseInt(req.query.page)  || 1;
    const perPage = 2; // display 2 product per page

    const skips =page > 1 ?(page - 1)* perPage: 0;   //   if(page>1 ){return (page-1)*perPage}   else {return 0;}

    const limits = perPage;
    UserModel.find().sort().skip(skips).limit(limits)
    .then((users)=>{
        res.send(users)
    })
}
]
exports.login=[(req,res)=>{
UserModel.findOne({
    username: req.body.username,
    password: req.body.password
}).then((user)=>{
    user?res.send(true):res.send(false)
    // let userFound = false
    // if(user){
    //     userFound = true
    // }
    // res.send(userFound)
    // console.log(user)
}).catch((err)=>{
    res.send(err)
})
}]
exports.delete=[(req,res)=>{
    UserModel.deleteOne({_id:req.params.id})
    .then((data)=>{
        res.send(data)
        console.log(data)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })
}]