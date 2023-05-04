const HotelModel =require('../models/Hotel')

const HotelRouter = require('express').Router();




HotelRouter.post("/createhotel",async function(req,res,next){

    const {
        name,
        type,
        address,
        contactnumber,
        defaultrating
    }=req.body;

    const HotelNew = new HotelModel({
     name: name,
   type:type,
   
    address: {
      city: address.city,
      state: address.state,
      area: address.area,
     
      addressLine1: address.addressLine1,
     
      pincode: address.pincode,
    },
    contactnumber: contactnumber,
    defaultrating: defaultrating,
  
    });
    HotelNew.save().then((response)=>{
        if(response && response._id){
            return res.status(200).json({
                success:true,
                message:"Hotel  created successfully",
                data:response
            })
        }
    }).catch((error)=>{
        return res.status(401).json({
            success:false,
            message:"Hotel created failed",
            error:error
    })

    })

})


module.exports=HotelRouter