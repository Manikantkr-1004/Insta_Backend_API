const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const {BlackModel} = require("./model/blackModel");
const { postRouter } = require("./routes/postRoutes");
const port = process.env.PORT || 7700;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users",userRouter)
app.use("/posts",postRouter)

app.get("/",(req,res)=>{
    res.send("You are on the Home page")
})

app.post("/logout",async(req,res)=>{
    const {token} = req.body;
    try {
        let black = new BlackModel({token});
        await black.save();
        res.status(200).json({"msg":"Logged out Successfully!!"})
    } catch (error) {
        res.status(500).json({"msg":"Internal Server Error!!"})
    }
})


app.listen(port,async()=>{
    try {
        await connection;
        console.log("DATA base is connected");
        console.log("Server is running successfully");
    } catch (error) {
        console.log(error);
    }
})