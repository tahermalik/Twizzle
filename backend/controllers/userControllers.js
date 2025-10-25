import express from "express";
import { userData } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path:"../.env"})
export async function Register(req,res){
    try{
        const {name,email,username,password}=req.body;
        if(!name || !email || !username || !password){
            res.status(401).json({message:"fill all the field"})
        }
        let unique_mail= await userData.findOne({email:email})
        let unique_username=await userData.findOne({user_name:username})
        
        if(unique_mail){
            res.status(401).json({message:"email id already exists"})
        }else if(unique_username){
            res.status(401).json({message:"username already exists"})
        }else{
            const userAccount=new userData({
                name:name,
                user_name:username,
                email:email,
                password:await bcrypt.hash(password,16)
            })

            await userAccount.save();
            res.status(201).json({message:"account created"})
        }
    }catch{
        console.log("error occured")
        res.send("error")
    }
}


export async function Login(req,res){
    try{
        const {username,password}=req.body;
        // res.send(req.body);
        // console.log("login details ",req.body)

        // console.log(username,password)
        if(!username || !password){
            res.status(401).json({message:"fill both the details"})
        }
        const user_doc=await userData.findOne({user_name:username})
        if(!user_doc){
            res.status(401).json({message:"username or password is not correct"})
        }

        const user_password=user_doc.password;
        const flag=await bcrypt.compare(password,user_password)
        if(!flag){
            res.status(401).json({message:"username or password is not correct"})
        }
        
        const token = jwt.sign(
            { id: user_doc._id, username: user_doc.user_name }, // payload
            process.env.JWT_SECRET, // secret key
            { expiresIn: "1d" } // token expiry
        )
    

        /// fethcing the user details
        const user_info=await userData.findOne({user_name:username}).select("-password")
        // console.log(user_info)
        return res.status(201).cookie("token",token,{maxAge:60 * 60 * 1000,httpOnly:true,sameSite:"lax",secure:false}).json({message:`Welcome @${user_doc.name}`,user_info})

    }
    catch(error){
        console.log(error);
        return res.status(504).json({message:"server side problem"})
    }
}


export async function Logout(req,res){
    try{
        console.log(req.cookies);
        console.log("hello logging out")
        res.clearCookie("token",{httpOnly:true,maxAge:1})
        return res.status(200).json({message:`${req.user_info.username} logout successfully`})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Server side problem"})
    }
}


export async function deleteUser(req,res){
    const id=req.user_info.id; // possible only if the user is authenticated
    await userData.findByIdAndDelete(id);
    res.clearCookie("Token")
    return res.status(201).json({message:"User deleted succefully"})
}

export async function bookmark(req,res){
    const tweet_id=req.params.id;
    const user_id=req.user_info.id; // will get the user_id

    const user_data=await userData.findById(user_id);
    if(user_data.bookmarks.includes(tweet_id)){
        await userData.findByIdAndUpdate(user_id,{$pull:{bookmarks:tweet_id}})
        return res.status(201).json({message:"bookmark removed succesfully"})
    }else{
        await userData.findByIdAndUpdate(user_id,{$push:{bookmarks:tweet_id}})
        return res.status(201).json({message:"bookmark added successfully"})
    }

}

export async function profile(req,res){
    try{
        const user_id=req.params.id;

        /// handling if the id is null
        if(!user_id){
            return res.send(404).json({message:"Received Null as the ID"})
        }
        
        //// will give the complete user information but will remove the password field
        const user_info=await userData.findById(user_id).select("-password");
        res.status(200).json({
            user_info
        })

    }catch(error){
        console.log(error);
    }

}

export async function getOtherUser(req,res){
    try{
        const user_id=req.user_info.id;
        const other_user_data=await userData.find({_id:{$ne:user_id}}).select("-password");
        const who_to_follow={};
        let counter=0;
        for(let i=0;i<other_user_data.length;i++){
            if(!other_user_data[i].followers.includes(user_id)){
                who_to_follow[`user_${++counter}`]=other_user_data[i];
            }
        }
        return res.status(200).json({
            who_to_follow
        })
    }catch(error){
        console.log(error);
    }
}

export async function follow(req,res){
    try{
        const logged_user_id=req.user_info.id;
        const follow_btn_user=req.params.id;

        const following_data=await userData.findById(logged_user_id);
        const follower_user_data=await userData.findById(follow_btn_user)
        
        if(!following_data.following.includes(follow_btn_user)){
            await userData.findByIdAndUpdate(logged_user_id,{$push:{following:follow_btn_user}})
            await userData.findByIdAndUpdate(follow_btn_user,{$push:{followers:logged_user_id}})
            return res.status(200).json({
                message:`${following_data.name} started following ${follower_user_data.name}`,
                bool:true
            })
        }
        else{
            await userData.findByIdAndUpdate(logged_user_id,{$pull:{following:follow_btn_user}})
            await userData.findByIdAndUpdate(follow_btn_user,{$pull:{followers:logged_user_id}})
            return res.status(200).json({
                message:`${following_data.name} just un-followed ${follower_user_data.name}`,
                bool:false
            })
        }
        
    }catch(error){
        console.log(error);
    }
}

export async function youFollow(req,res){
    try{
        console.log("inside you follow")
        const user_id=req.user_info.id;
        const user_info=await userData.findById(user_id);
        const following_array=user_info.following;
        const you_follow={};
        for(let i=0;i<following_array.length;i++){
            const info=await userData.findById(following_array[i]).select("-password")
            you_follow[`user_${i+1}`]=info;
        }

        res.status(200).json({you_follow})

    }catch(error){
        console.log(error)
    }
}