import express from "express";
import { check } from "../controllers/isAuthenticate.js";
import { createTweet ,deleteTweet, getAllTweets, getFollowingTweets, likeOrDislike} from "../controllers/tweetControllers.js";

export default function tweetRouter(){
    const router=express.Router();
    console.log("tweet route")
    router.post("/create_tweet",(req,res,next)=>check(req,res,next),(req,res)=>createTweet(req,res));
    router.delete("/delete/:id",(req,res,next)=>check(req,res,next),(req,res)=>deleteTweet(req,res))
    router.put("/likeordislike/:id",(req,res,next)=>check(req,res,next),(req,res)=>likeOrDislike(req,res));
    router.get("/getAllTweets",(req,res,next)=>check(req,res,next),(req,res)=>getAllTweets(req,res))
    router.get("/getFollowingTweets",(req,res,next)=>check(req,res,next),(req,res)=>getFollowingTweets(req,res))
    return router;
}