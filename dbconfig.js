const mongoose = require('mongoose')
const dotenv = require('dotenv')
const db_name='room'

const db_url=`mongodb+srv://karthick18696:Ayyammal1@cluster0.bwkbmts.mongodb.net/${db_name}`


module.exports=db_url;