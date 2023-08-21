const express = require("express");
const { auth } = require("../middleware/auth");
const {PostModel} = require("../model/postModel")

const postRouter = express.Router();

postRouter.use(auth);

postRouter.post("/add",async(req,res)=>{
    try {
        let post = new PostModel(req.body);
        await post.save();
        res.status(200).json({"msg":"Post has been created!!"})
    } catch (error) {
        res.status(500).json({"msg":"Internal Server Error"})
    }
})

postRouter.get("/",async(req,res)=>{
    const {userID} = req.body;
    const {device,page} = req.query;
    try {
        
        let qury = {};
        qury.userID = userID;

        if(device){
            qury.device = device;
        }

        let skipping = 0;
        if(page && page===1){
            skipping = 0
        }else if(page && page>1){
            skipping = page*3
        }

        const post = await PostModel.find(qury).skip(skipping).limit(3);
        const total = await PostModel.countDocuments({userID});
        res.status(200).json({post,total})
    } catch (error) {
        res.status(500).json({"msg":"Internal Server Error"})
    }
})

postRouter.get("/top",async(req,res)=>{
    const {page} = req.query;
    try {
        
        let qury = {};
        qury.userID = userID;

        let skipping = 0;
        if(page && page===1){
            skipping = 0
        }else if(page && page>1){
            skipping = page*3
        }

        const post = await PostModel.find(qury).skip(skipping).limit(3).sort({$no_of_comments: -1});
        const total = await PostModel.countDocuments({userID});
        res.status(200).json({post,total})
    } catch (error) {
        res.status(500).json({"msg":"Internal Server Error"})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        if(id){
            let post = await PostModel.findByIdAndUpdate({_id:id,userID: req.body.userID}, req.body);
            res.status(200).json({"msg":"Post has been updated!!"})
        }else{
            res.status(400).json({"msg":"Something Went wrong, Try again!!"})
        }
    } catch (error) {
        res.status(500).json({"msg":"Internal Server Error"})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        if(id){
            let post = await PostModel.findByIdAndDelete({_id:id,userID: req.body.userID});
            res.status(200).json({"msg":"Post has been deleted!!"})
        }else{
            res.status(400).json({"msg":"Something Went wrong, Try again!!"})
        }
    } catch (error) {
        res.status(500).json({"msg":"Internal Server Error"})
    }
})



module.exports = {postRouter};