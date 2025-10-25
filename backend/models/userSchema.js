import mongoose from "mongoose";

const schema=new mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true,
        unique:true
    },
    "user_name":{
        type:String,
        required:true,
        unique:true
    },
    "password":{
        type:String,
        required:true
    },
    "followers":{
        type:Array,
        default:[]
    },
    "following":{
        type:Array,
        default:[]
    },
    "bookmarks":{
        type:Array,
        default:[]
    }
},{timestamps:true})

export const userData=mongoose.model("userData",schema)