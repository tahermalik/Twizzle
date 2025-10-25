import express from "express";
import {Register,Login,Logout, deleteUser, bookmark,profile, getOtherUser,follow,youFollow} from "../controllers/userControllers.js"
import { createTweet } from "../controllers/tweetControllers.js";
import { check } from "../controllers/isAuthenticate.js";


export default function userRouter(){
    const router=express.Router();
    console.log("Hello Taher")
    router.post("/register",(req,res)=>Register(req,res))
    router.post("/login",(req,res)=>Login(req,res))
    router.get("/logout",(req,res,next)=>check(req,res,next),(req,res)=>Logout(req,res))
    router.delete("/delete",(req,res,next)=>check(req,res,next),(req,res)=>deleteUser(req,res))
    router.put("/bookmark/:id",(req,res,next)=>check(req,res,next),(req,res)=>bookmark(req,res))
    router.get("/profile/:id",(req,res,next)=>check(req,res,next),(req,res)=>profile(req,res))
    router.get("/getOtherUser",(req,res,next)=>check(req,res,next),(req,res)=>getOtherUser(req,res))
    router.put("/follow/:id",(req,res,next)=>check(req,res,next),(req,res)=>follow(req,res))
    router.get("/youfollow",(req,res,next)=>check(req,res,next),(req,res)=>youFollow(req,res))
    return router;
}


