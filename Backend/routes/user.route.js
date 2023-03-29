const {UserModel} = require('../models/user.model')
const express = require('express')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userRouter = express.Router()
userRouter.use(express.json())

// logic for registring a user

userRouter.post('/register', async(req,res)=>{
    let {name,email,gender, password,age,city,is_married} = req.body
    const user = await UserModel.findOne({email: email})
    if(user) res.status(400).send({msg:"User already exist, please login"})
    else{
        try {
            bcrypt.hash(password,7,async(err,hash)=>{
                const user =new UserModel({name,email,gender, password:hash,age,city,is_married}) 
                await user.save()
                res.status(200).send({msg: "Registration Successfully Done."})
            })
        } catch (error) {
            res.status(400).send({msg: error})
        }
    }
})


// logic for loging in a user

userRouter.post('/login',async (req,res)=>{
    let {email, password} = req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password, function(err,result){
                if(result){
                    const token = jwt.sign({userId : user._id}, process.env.jwtToken)
                    res.status(200).send({msg:"Login Successful", token: token})
                }else{
                    res.status(400).send({msg: "Wrong Credentials!"})
                }
            })
        }
        else res.status(400).send({msg: "Wrong Credentials!"})
    } catch (error) {
        res.status(400).send({msg: "Wrong Credentials!",error : error.message})
    }
})


module.exports = {userRouter}