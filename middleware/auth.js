const jwt = require("jsonwebtoken");
const { BlackModel } = require("../model/blackModel");


const auth = async(req,res,next)=>{
    let token = req.headers.authorization.split(" ")[1];
    let black = await BlackModel.findOne({token});
    if(!black){
        jwt.verify(token,"manikant",async(err,decoded)=>{
            if(decoded){
                let userID = decoded.userID;
                let name = decoded.name;
                req.body = {...req.body, userID, name}
                // console.log(req.body);
                next()
            }else{
                res.status(400).json({"msg":"Your Session is Expired, Please Login!!"})
            }
        })
    }else{
        res.status(400).json({"msg":"Please Login!!"})
    }
}

module.exports = {auth};