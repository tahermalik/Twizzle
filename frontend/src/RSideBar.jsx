import { Icons, MyImage } from './feed';
import { useDispatch, useSelector } from 'react-redux';
import useGetOtherUser from './hooks/useGetOtherUser';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINTS } from './utils/endpoints';
import toast from 'react-hot-toast';
import { useState } from 'react';
import useGetAllTweets from './hooks/useGetAllTweets';
import { useEffect } from 'react';
import { getOtherUser, toggleFollow, update } from './redux/slices/userSlice';
import useGetFollowingUser from './hooks/useGetFollowingUser';
function SearchBar() {
    return (
        <div className="flex flex-row gap-2 items-center border-[1px] border-gray-300 rounded-2xl py-2 px-1">
            <Icons name="/search_icon" />
            <div className="w-[80%]"><input className="w-full outline-0 sm:text-md md:text-lg lg:text-xl" type="text" placeholder="Search" /></div>
        </div>
    )
}

function Button(props) {
    return (
        <div className="">
            <button className="bg-[#787a7a] sm:text-sm md:text-md lg:text-lg flex flex-row justify-center items-center pt-1 pb-1 pr-2 pl-2 rounded-2xl">{props.info}</button>
        </div>
    )
}

function Person(props) {
    const [f_text,setFText]=useState("Follow")
    const fetchTweets=useGetAllTweets();
    const user_info = useSelector((state)=>state?.user?.user)
    const dispatch=useDispatch()
    async function followHandler(follow_btn_user_id){
        try{
            const res=await axios.put(`${USER_API_END_POINTS}/follow/${follow_btn_user_id}`,{},{withCredentials:true})
            toast.success(res?.data?.message)
            if(res?.data?.bool){
                setFText("Following")
            }else setFText("Follow")
            dispatch(update(follow_btn_user_id))
            
            fetchTweets();
        }catch(error){
            toast.error("something went wrong hola")
            console.log(error)
        }

    }

    // useEffect(()=>{
    //     try{
    //         console.log("inside the useEffect for the fucking thing")
    //         if(user_info?.following?.includes(props?.id)) setFText("Following")
    //         else setFText("Follow")
    //     }catch(error){
    //         toast.error("something went wrong hola")
    //         console.log(error)
    //     }
    // })

    
    return (
        <div className='flex flex-row gap-2 sm:justify-between lg:justify-evenly items-center'>
            <MyImage name={`${props?.name}`} />
            <div className='flex flex-row lg:justify-between items-center w-[90%] sm:justify-center'>
                <Link to={`/profile/${props?.id}`}><div className='flex flex-col gap-0 sm:hidden lg:block'>
                    <div><span className='font-bold capitalize'>{`${props?.name}`}</span></div>
                    <div><span className='text-gray-300'>{`${props?.username}`}</span></div>
                </div></Link>
                <div onClick={()=>followHandler(props?.id)}><Button info={`${props?.bool ? "Following":"Follow"}`} /></div>

            </div>
        </div>
    )
}

function WhoToFollow(props) {
    // const array=Array.from(props.whoToFollow);
    console.log(props?.whoToFollow)
    return (
        <div className='h-fit w-full p-2 mt-4 border-[1px] border-gray-300 rounded-2xl flex flex-col gap-3'>
            <div><span className='sm:text-md md:text-lg lg:text-xl'>Who to Follow !!</span></div>
            {
                Object.entries(props?.whoToFollow).map(([key, value]) => (
                    <Person name={value?.name} username={value?.user_name} id={value?._id} bool={false}/>
                ))
            }
        </div>
    )
}

function YouFollow(props){
    console.log("you follow",props?.youFollow)
    return (
        <div className='h-fit w-full p-2 mt-4 border-[1px] border-gray-300 rounded-2xl flex flex-col gap-3'>
            <div><span className='sm:text-md md:text-lg lg:text-xl'>You Follow !!</span></div>
            {
                Object.entries(props?.youFollow).map(([key, value]) => (
                    <Person name={value?.name} username={value?.user_name} id={value?._id} bool={true}/>
                ))
            }
        </div>
    )
}

export default function RSideBar() {
    useGetOtherUser();
    useGetFollowingUser();
    const who_to_follow = useSelector((state) => state?.user?.otherUser);
    const you_follow=useSelector((state)=>state?.user?.following);
    // console.log("datatataa",you_follow)
    if (!who_to_follow || !you_follow) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div className="w-[30%] h-full bg-black flex flex-col p-2">
            <SearchBar />
            <WhoToFollow whoToFollow={who_to_follow} />
            <YouFollow youFollow={you_follow}/>
        </div>
    )
}