const { default: mongoose } = require('mongoose')
const momgoose = require('mongoose')

const RoomModel = mongoose.Schema({
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    type:{
        type:String,
        required:true
    },
   
    maxPeople:{
        type:Number,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    roomNumber:{type:Number,
    required:true},
    ifBooked:{
        type:String,
        required:false
    },
    starttime:{
        type:String,
        required:false
    },
    endtime:{
        type:String,
        required:false
    },
  
   
},
{
timestamps:true,
}
);

module.exports=mongoose.model('rooms',RoomModel)