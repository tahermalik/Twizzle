import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINTS } from "../utils/endpoints";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFollowing } from "../redux/slices/userSlice";

export default function useGetFollowingUser(){
    const dispatch=useDispatch();
    async function getData(){
        try{
            console.log("inside my hook")
            const res=await axios.get(`${USER_API_END_POINTS}/youfollow`,{withCredentials:true})
            // console.log("dattaaaa",res.data.you_follow)
            dispatch(getFollowing(res.data.you_follow))
        }catch(error){
            toast.error("something went wrong while fetching follwoing user data")
            console.log(error)
        }
    }
    useEffect(()=>{
        getData();
    },[])

    async function refreshFollwoingUser(){
        await getData();
    }
    return refreshFollwoingUser;
}