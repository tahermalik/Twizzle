import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const tweetSlice= createSlice({
    name:"tweetSlice",
    initialState:{tweet:null,makeTweet:null,isActive:true},
    reducers:{
        getAllTweets:(state,action)=>{
            state.tweet=action.payload
        },
        createTweet:(state,action)=>{
            state.makeTweet=action.payload
        },
        setIsActive:(state,action)=>{
            state.isActive=action.payload
        },
        setNull_T:(state)=>{
            state.tweet=null;
            state.makeTweet=null;
            state.isActive=true
        }

    }
})
    
export const {getAllTweets,createTweet,setIsActive,setNull_T}=tweetSlice.actions;
export default tweetSlice.reducer;