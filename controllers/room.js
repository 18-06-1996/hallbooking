
const RoomModel=require('../models/Room')
const RoomRouter = require('express').Router();




RoomRouter.post("/createroom",async function(req,res,next){

    const {
        hotelId,
           type ,
           maxPeople,
            price,
            roomNumber,
            ifBooked,
            starttime,
            endtime
           
    }=req.body;

    const RoomNew = new RoomModel(
        {
            hotelId,
           type ,
           maxPeople,
            price,
            roomNumber,
            ifBooked,starttime,
            endtime
        });
    RoomNew.save().then((response)=>{
        if(response && response._id){
            return res.status(200).json({
                success:true,
                message:"Room created successfully",
                data:response
            })
        }
    }).catch((error)=>{
        return res.status(401).json({
            success:false,
            message:"Room created failed",
            error:error
    })

    })

})






RoomRouter.get("/allrooms/:hotelId",function(req,res,next){
    const{ hotelId}=req.params;
    if(!hotelId){
       return  res.status(400).json({
            success:false,
    message:"hotel_Id not fetched",
    error:"no hotel_Id found"
        })
    }
RoomModel.find({hotelId: hotelId}).then((response)=>{

    if(response&&response.length>0){
return res.status(200).json({
    success:true,
    message:"room  are collected",
    data:response
});
}
else{
    return res.status(200).json({
        success:true,
        message:" no room  collected",
        data:response
    });
}

}).catch((error)=>{
    return res.status(401).json({
        success:false,
        message:"rom are  not collected",
        error :error
    });
})

   
})


module.exports= RoomRouter;