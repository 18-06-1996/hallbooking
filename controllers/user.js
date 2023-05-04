const User=require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { hashPassword, hashCompare, createToken ,roleAdminGaurd,validate} = require('../common/authetic');


const UserRouter= require('express').Router();


UserRouter.post('/signup', async(req,res)=>{
    try {
     let user = await User.findOne({email:req.body.email})
         console.log(user)
      if(!user){
        
        let hashedPassword = await hashPassword(req.body.password)
        req.body.password = hashedPassword
         let user = await User.create(req.body) 
      res.status(201).send({user,message:"user signup successful"})
      }
      else
       {
        res.status(400).send({message:"user alreadt exists"})
      }
    } catch (error) {
  
      res.status(500).send({
        message:"internal server error"
      })
    }
    
  })
  

UserRouter.post('/login',async(req,res)=>{
    try {
      let user = await User.findOne({email:req.body.email})
      if(user)
      {
        //verify the password
        if(await hashCompare(req.body.password,user.password)){
          // create the token
          let token = await createToken({
            name:user.name,
            email:user.email,
            id:user._id,
            isAdmin:user.isAdmin
          })
         
          res.status(200).send({
            message:"User Login Successfull!",user,
          token
          })
        }
        else
        {
          res.status(402).send({message:"Invalid Credentials"})
        }
      }
      else
      {
        res.status(400).send({message:"User Does Not Exists!"})
      }
  
    } catch (error) {
      res.status(500).send({message:"Internal Server Error",error})
    }
  })
  

  UserRouter.get('/', validate,roleAdminGaurd, async(req,res)=>{
    try {
      let users = await User.find({},{password:0})
      res.status(200).send({users,message:"users details"})
      
    } catch (error) {
      res.status(500).send({
        message:"internal server error"
      }),
      error
      
    }
  })


  
UserRouter.delete('/:id', async(req,res)=>{
  try {
   let user = await User.findOne({_id:req.params.id})
       console.log(user)
    if(user){
       let user = await User.deleteOne({_id:req.params.id}) 
    res.status(201).send({message:"user data deleted successful"})
    }
    else
     {
      res.status(400).send({message:"user data not found"})
    }
  } catch (error) {

    res.status(500).send({
      message:"internal server error"
    })
  }
  
})

UserRouter.put('/:id', async(req,res)=>{
  try {
   let user = await User.findOne({_id:req.params.id})
       console.log(user)
    if(user){
      
      user.name= req.body.name
      user.email= req.body.email
      user.password= req.body.password
      user.mobile= req.body.mobile
      user.city= req.body.city
      user.isAdmin=req.body.isAdmin

      await user.save()

    res.status(201).send({user,message:"user data updated successful"})
    }
    else
     {
      res.status(400).send({message:"user dose not exists"})
    }
  } catch (error) {

    res.status(500).send({
      message:"internal server error"
    }), error
  }
  
})

  


module.exports=UserRouter;
