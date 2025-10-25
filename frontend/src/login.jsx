import { useState } from "react"
import axios from "axios";
import { USER_API_END_POINTS,TWEET_API_END_POINTS } from "./utils/endpoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOtherUser,getUser ,getUserProfile} from "./redux/slices/userSlice";
import { setIsActive } from "./redux/slices/tweetSlice";

function LoginBox(){
    const[loading,setLoading]=useState(false);
    const [newUser,setNewUser]=useState(false);
    const Details={
        name:"",
        username:"",
        password:"",
        email:""
    }
    const [userDetails,setUserDetails]=useState(Details);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    function toggle(){
        setNewUser(!newUser)
    }

    async function submitData(e){
        e.preventDefault();
        setUserDetails(userDetails)
        dispatch(setIsActive(true))
        if(newUser){
            // perform sign-in
            try{
               const res=await axios.post(`${USER_API_END_POINTS}/register`,userDetails,{withCredentials:true})
            //    console.log(res)
            //    console.log(res.data.message)
               toast.success(res.data.message)
               setNewUser(false)
            }catch(error){
                toast.error(error.response.data.message)
            }

        }else{
            // perform log-in
            try{
                const res=await axios.post(`${USER_API_END_POINTS}/Login`,userDetails,{withCredentials:true})
                // console.log(res.data)
                toast.success(res.data.message)
                dispatch(getUser(res.data.user_info))
                navigate("/")

            }catch(error){
                toast.error(error.response.data.message)
            }
        }

    }
    return(
        <div className="h-[50%] w-[50%] flex flex-col gap-6 p-2">
            <div className="w-full pl-3"><span className="sm:text-4xl lg:text-6xl font-bold">Happening Now...</span></div>
            <div className="w-[80%]">
                <form className="w-full" action="" onSubmit={(e)=>submitData(e)}>
                    <div className="flex flex-col gap-3 w-full">
                        {newUser && <div className="w-full"><input onChange={(e)=>setUserDetails({name:e.target.value,username:userDetails.username,email:userDetails.email,password:userDetails.password})} value={userDetails.name} className="w-full px-5 py-2 placeholder:sm:text-lg placeholder:md:text-xl placeholder:lg:text-2xl  sm:text-lg md:text-xl lg:text-xl outline-0 focus:border-1 border-blue-400 rounded-full" type="text" placeholder="Enter Name"/></div>}
                        {newUser && <div className="w-full"><input onChange={(e)=>setUserDetails({email:e.target.value,username:userDetails.username,name:userDetails.name,password:userDetails.password})} value={userDetails.email} className="w-full px-5 py-2 placeholder:sm:text-lg placeholder:md:text-xl placeholder:lg:text-2xl  sm:text-lg md:text-xl lg:text-xl outline-0 focus:border-1 border-blue-400 rounded-full" type="email" placeholder="Enter Email"/></div>}
                        <div className="w-full"><input onChange={(e)=>setUserDetails({username:e.target.value,name:userDetails.name,email:userDetails.email,password:userDetails.password})} value={userDetails.username} className="w-full px-5 py-2 placeholder:sm:text-lg placeholder:md:text-xl placeholder:lg:text-2xl  sm:text-lg md:text-xl lg:text-xl outline-0 focus:border-1 border-blue-400 rounded-full" type="text" placeholder="Enter username"/></div>
                        <div className="w-full"><input onChange={(e)=>setUserDetails({password:e.target.value,username:userDetails.username,email:userDetails.email,name:userDetails.name})} value={userDetails.password} className="w-full px-5 py-2 placeholder:sm:text-lg placeholder:md:text-xl placeholder:lg:text-2xl  sm:text-lg md:text-xl lg:text-xl outline-0 focus:border-1 border-blue-400 rounded-full" type="password" placeholder="Enter Password"/></div>
                        <div className="pl-5 w-full mt-2"><button className="bg-gray-300 text-black w-full px-3 py-2 rounded-full sm:text-lg md:text-xl flex flex-row justify-center items-center cursor-pointer hover:bg-gray-400">{newUser ? "Sign-In":"Log-In"}</button></div>
                        <div className="pl-5"><span>{newUser ? "Already have an account!":"Create new Account!"}</span><span onClick={toggle} className="cursor-pointer text-gray-300 ml-3 underline">{newUser ? "Log-in":"Create"}</span></div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default function Login(){
    return(
        <div className="w-screen h-screen bg-black text-white flex flex-row justify-center items-center">
            <div className="flex flex-row justify-around items-center gap-2 w-[70%]">
                <div className="h-[200px] w-[200px]"><img className="invert-75 object-contain h-full w-full" src="logo.svg" alt="logo_img" /></div>
                <LoginBox/>
            </div>
        </div>
    )
}