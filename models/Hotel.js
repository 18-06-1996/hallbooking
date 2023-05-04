const { default: mongoose } = require('mongoose')
const momgoose = require('mongoose')

const HotelModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   
    type:{
        type:String,
        required:true
    },
    address:{
        addressLine1:{
            type:String,
        required:true
        },
        area:{
            type:String,
        required:true
        },
        city:{
            type:String,
        required:true
        },
        state:{
            type:String,
        required:true
        },
        pincode:{
            type:Number,
        required:true
        },
    },
    contactnumber:{
        type:String,
        required:true
    },
  
    defaultrating:{
        type:Number,
        default:3
    }
},
{
timestamps:true,
}
);

module.exports=mongoose.model('hotels',HotelModel)