const express = require("express");
const {UserModel} = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married} = req.body;
    try {
        let user = await UserModel.findOne({email});
        if(!user){
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(400).json({"msg":"Something went wrong!!"});
                }else{
                    let instauser = new UserModel({name,email,gender,password:hash,age,city,is_married});
                    await instauser.save();
                    res.status(201).json({"msg":"Account Created Successfully!!"});
                }
            })
        }else{
            res.status(400).json({"msg":"Email is already registered!!"})
        }
    } catch (error) {
        res.status(500).json({"msg":"Internal Server Error, Try again!!"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        let user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(result){
                    let token = jwt.sign({userID: user._id,name: user.name},"manikant",{expiresIn:"7d"});
                    let name = user.name
                    res.status(200).json({"msg":"Logged in Successfully",token,name});
                }else{
                    res.status(400).json({"msg":"Password is wrong!!"})
                }
            })
        }else{
            res.status(400).json({"msg":"Email is not exists or wrong !!"})
        }
    } catch (error) {
        res.status(500).json({"msg":"Internal Server Error, Try again!!"})
    }
})




module.exports = {userRouter};