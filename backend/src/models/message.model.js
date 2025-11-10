import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{type:String, required:true},//clerk user Id
    reciverId:{type:String, required:true}, //clerk user Id
    content:{type:String, required:true},
},{timestamps:true});

export const  Message = mongoose.model("message",messageSchema);