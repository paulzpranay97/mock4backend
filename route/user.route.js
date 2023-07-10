const express = require("express");
const {userModel} = require("../model/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config()
userRouter.post("/register",async(req,res)=>{
    const {name,email,password,address} = req.body;
    const Exists = await userModel.findOne({email})
    if(Exists){
        return res.status(400).json({"ok":false,"mssg":"User already Exists"})
    }
bcrypt.hash(password,9, async(err,hashed)=>{
    try {
        const data = new userModel({name,email,password:hashed,address});
        await data.save()
        return res.status(201).json({"ok":true,"mssg":"User Registered Successfully"})
    } catch (error) {
        return res.status(400).json({"ok":false,"mssg":error.message})
    }
})
})
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
  try {
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({"ok":false,"mssg":"User not Found !"})
    }
    const comparison = await bcrypt.compare(password,user.password);
    if(!comparison){
        return res.status(400).json({"ok":false,"mssg":"Invalid Credentials"})
    }
    const token = jwt.sign({userId:user._id},process.env.ss,{expiresIn:"2hr"})
    const response = {
        "ok":true,
        "Token":token,
        "mssg":"Login Successfull"
    }
    res.status(201).json(response)
  } catch (error) {
    return res.status(400).json({"ok":false,"mssg":error.message})
  }
})
userRouter.patch("/user/:id/:reset",async(req,res)=>{
    const {password,newPassword} = req.body;
    const ids = req.params.id
    try {
        const user= await userModel.findById({_id:ids})
        if(!user){
            return res.status(400).json({"ok":false,"mssg":"Register first"})
        }
        const comparison = await bcrypt.compare(password,user.password);
        if(!comparison){
            return res.status(400).json({"ok":false,"mssg":"Enter Correct Password to Reset"})
        }
        bcrypt.hash(newPassword,9, async(err,hashed)=>{
            try {
                const data = await userModel.findByIdAndUpdate({_id:ids,password:newPassword})
                await data.save()
                return res.status(201).json({"ok":true,"mssg":"Password Changed Successfully"})
            } catch (error) {
                return res.status(400).json({"ok":false,"mssg":error.message})
            }
        })
    } catch (error) {
        return res.status(400).json({"ok":false,"mssg":error.message})
    }
})
module.exports={
    userRouter
}