import { useEffect } from "react";
import LSideBar from "./LSideBar";
import RSideBar from "./RSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home(){
    const user_info=useSelector((state)=>state.user.user)
    console.log("user info is ",user_info)
    const navigate=useNavigate();
    useEffect(()=>{
        if(!user_info){
            console.log("FUCK YOU , go and do login first")
            navigate("/login")
        }
    },[])

    if(!user_info){
        return(
            <div>Loading...</div>
        )
    }else{
        return(
            <div className="flex flex-row  bg-blue-500 w-[80%] mx-auto justify-between items-center h-screen text-white">
                <LSideBar/>
                <Outlet/>
                <RSideBar/>
            </div>
        )
    }
}