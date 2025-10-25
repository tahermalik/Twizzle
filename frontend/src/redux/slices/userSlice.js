import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name:"userSlice",
    initialState:{user:null,otherUser:{},profile:null,viewProfileID:null,follow:true,following:{}},
    reducers:{
        getUser:(state,action)=>{
            state.user=action.payload;
        },
        getOtherUser:(state,action)=>{
            state.otherUser=action.payload;
        },
        getUserProfile:(state,action)=>{
            state.profile=action.payload
        },
        setViewProfileID:(state,action)=>{
            state.viewProfileID=action.payload
        },
        toggleFollow:(state)=>{
            state.follow=!state.follow
        },
        setNull_U:(state)=>{
            state.follow=true;
            state.user=null;
            state.otherUser={};
            state.profile=null;
            state.viewProfileID=null;
            state.following={}
        },
        getFollowing:(state,action)=>{
            state.following=action.payload
        },
        update:(state,action)=>{
            let user_data=null
            let user_key=null
            for(let key in state.otherUser){
                if(state.otherUser[key]._id===action.payload){
                    user_data=state.otherUser[key];
                    user_key=key
                    break;
                }
            }

            if(user_data){
                const counter = Object.keys(state.following).length;
                state.following[`user_${counter+1}`]=user_data
                delete state.otherUser[user_key]
            }else{
                for(let key in state.following){
                    if(state.following[key]._id===action.payload){
                        user_data=state.following[key];
                        user_key=key;
                        break;
                    }
                }
                const counter = Object.keys(state.otherUser).length;
                state.otherUser[`user_${counter+1}`]=user_data
                delete state.following[user_key]
            }
        }
    }
})
    
export const {getUser,getOtherUser,getUserProfile,setViewProfileID,toggleFollow,setNull_U,getFollowing,update}=userSlice.actions;
export default userSlice.reducer;