import axios from "axios";
import { useEffect } from "react";
import {USER_API_END_POINTS} from "../utils/endpoints.js"
import { useDispatch } from "react-redux";
import {getOtherUser} from "../redux/slices/userSlice.js"
import toast from "react-hot-toast";

export default function useGetOtherUser(){
    const dispatch=useDispatch();
    useEffect(()=>{
        try{
            async function otherUser(){
                const res=await axios.get(`${USER_API_END_POINTS}/getOtherUser`,{withCredentials:true})
                dispatch(getOtherUser(res.data.who_to_follow))
            }
            otherUser();
        }catch(error){
            toast.error("something went wrong in getOtherUser")
            console.log(error);
        }
    },[])
}