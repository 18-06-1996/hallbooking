const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const db_url = require('./dbconfig');
const UserRouter = require('./controllers/user');
const HotelRouter = require('./controllers/hotel');
const RoomRouter = require('./controllers/room')




const app_server = express();

//database

mongoose.connect(db_url)
        



//middle wares
app_server.use(cors())

app_server.use(bodyParser.urlencoded({extended:true}))
app_server.use(bodyParser.json())

//controllers
app_server.use("/api/hotel",UserRouter);
app_server.use("/api/hotel",HotelRouter);
app_server.use("/api/hotel",RoomRouter);


module.exports=app_server