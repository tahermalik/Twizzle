import axios from "axios";
import { use, useEffect } from "react";
import { USER_API_END_POINTS } from "../utils/endpoints";
import { getUserProfile } from "../redux/slices/userSlice";
import { useDispatch} from "react-redux";
export default function useGetProfile(user_id){
    const dispatch=useDispatch();
    useEffect(()=>{
        async function getProfile(){
            try{
                const res=await axios.get(`${USER_API_END_POINTS}/profile/${user_id}`,{withCredentials:true})
                // console.log("Taher",res.data.user_info)
                dispatch(getUserProfile(res.data.user_info))
            }catch(error){
                console.log(error)
            }
        }
        getProfile();
    },[user_id])
} 