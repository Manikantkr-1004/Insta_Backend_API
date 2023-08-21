const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    title: {type: String,required:true},
    body: {type: String,required:true},
    device: {type: String,required:true},
    no_of_comments: {type: Number,required:true},
    userID: {type: String,required:true},
    name: {type: String,required:true}
},{
    versionKey: false
})

const PostModel = mongoose.model("post",PostSchema);

module.exports = {PostModel};