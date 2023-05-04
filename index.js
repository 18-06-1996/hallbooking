const express = require('express');
const app_server = require('./app');








const node_server = express()


require('dotenv').config();


node_server.use("/",app_server)


node_server.listen(process.env.PORT,'localhost',()=>{
    
    console.log(`server started in localhost : ${process.env.PORT}`);
})