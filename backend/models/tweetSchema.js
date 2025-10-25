import mongoose from "mongoose";

const schema=new mongoose.Schema({
    "user_id":{
        type:String,
        required:true
    },
    "name":{
        type:String,
        required:true
    },
    "username":{
        type:String,
        required:true
    },
    "description":{
        type:String,
        required:true
    },
    "like":{
        type:Array,
        default:[]
    },
    "retweet":{
        type:Number
    }
},{timestamps:true})

export const tweetData=mongoose.model("tweetData",schema)