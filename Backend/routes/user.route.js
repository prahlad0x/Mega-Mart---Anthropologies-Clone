const {UserModel} = require('../models/user.model')
const express = require('express')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userRouter = express.Router()
userRouter.use(express.json())

// logic for registring a user

userRouter.post('/register', async(req,res)=>{
    let {username,email,password,city,} = req.body
    const user = await UserModel.findOne({email: email})
    if(user) res.status(400).send({msg:"User already exist, please login"})
    else{
        try {
            bcrypt.hash(password,7,async(err,hash)=>{
                const user =new UserModel({username,email,password:hash,city, address:'', cart : []}) 
                await user.save()
                res.status(200).send({msg: "Registration Successfully Done."})
            })
        } catch (error) {
            console.log(error)
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
                    res.status(200).send({msg:"Login Successful", token: token, user:user})
                }else{
                    res.status(400).send({msg: "Wrong Credentials!"})
                }
            })
        }
        else res.status(400).send({msg: "User does not exists"})
    } catch (error) {
        res.status(400).send({msg: "Wrong Credentials!",error : error.message})
    }
})

userRouter.get('/:id',async(req,res)=>{
    try {
        const user =await UserModel.findOne({_id : req.params.id})
        res.status(200).send({msg: "userDetails",user:user})
    } catch (error) {
        res.status(400).send({msg: "User does not exists"})
    }
})

userRouter.patch('/updatecart/:id',async(req,res)=>{
    try {
        await UserModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send({msg: true})
    } catch (error) {
        res.status(400).send({msg: "Someting went wrong!",error : error.message})
    }
})

module.exports = {userRouter}