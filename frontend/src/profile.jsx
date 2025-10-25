import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import useGetProfile from "./hooks/useGetProfile"
import toast from "react-hot-toast"
import axios from "axios"
import { USER_API_END_POINTS } from "./utils/endpoints"
import { useEffect, useState } from "react"
import e from "cors"
import { toggleFollow, update } from "./redux/slices/userSlice"

function ProfileTopMost(){
    const user_info=useSelector((state)=>state.user.profile)
    console.log(user_info)
    return(
        <div className="flex flex-row p-2 justify-between items-center">
            <div className="flex flex-row justify-evenly items-center gap-5">
                <Link to="/" className="hover:bg-gray-600 hover:rounded-full p-1 flex flex-row items-center justify-center"><img className="lg:h-[25px] lg:w-[25px] md:h-[20px] md:w-[20px] sm:h-[18px] sm:w-[18px]" src="/back.svg" alt="back_arrow" /></Link>
                <div className="flex flex-col">
                    <div><span className="font-bold sm:text-md md:text-lg lg:text-xl">{user_info.name}</span></div>
                    <div><span className="text-sm text-gray-300">0 posts</span></div>
                </div>
            </div>

            <div className="mr-2 hover:bg-gray-600 hover:rounded-full p-1 flex flex-row items-center justify-center"><img className="lg:h-[25px] lg:w-[25px] md:h-[20px] md:g-[20px] sm:h-[18px] sm:w-[18px]" src="/search_icon.svg" alt="search_icon" /></div>

        </div>
    )
}

function MyImage(props){
    return(
        <div className="flex flex-row justify-center items-center absolute bottom-[1px] left-[20px] border-[5px] border-black rounded-full">
            <div className="w-[100px] h-[100px] rounded-full"><img className="w-[100%] h-[100%] rounded-full object-contain" src={`/${props.name}.jpg`} alt="my_photo" /></div>
        </div>
    )
}

function ProfileImage(props){
    const user_info=useSelector((state)=>state?.user?.user)
    // console.log(user_info._id,props.param_id)
    const [f_text,setFText]=useState("Follow")
    if(user_info?.following?.includes(props.param_id)) setFText("Following")
    const dispatch=useDispatch();
    async function followHandler(){
        try{
            const res=await axios.put(`${USER_API_END_POINTS}/follow/${props.param_id}`,{},{withCredentials:true})

            console.log("GEtting the user response from the server for follow",res.data.bool)
            if(res.data.bool) setFText("Following")
            else setFText("Follow")
            toast.success(res.data.message)
            console.log("Toggling")
            dispatch(toggleFollow())

            dispatch(update(props?.param_id))

        }catch(error){
            toast.error("something went wrong with follow btn")
            console.log(error)
        }
    }

    /// functionality will be added in future
    async function editProfileHandler(){}

    
    return(
        <div className="w-full h-[35%] bg-gray-800 relative">
            <div className="w-full h-[100%]"><img className="h-[100%] w-[100%] object-cover" src="/photo_18.jpg" alt="my_image" /></div>
            <MyImage name="taher_malik"/>
            <div class="absolute right-4 bottom-4 flex flex-row justify-center items-center gap-2">
                {(user_info?._id==props?.param_id)  && <div onClick={()=>editProfileHandler()}><button className="border-1 border-white px-3 py-1 rounded-full flex flex-row justify-center items-center hover:bg-gray-700 cursor-pointer"><span className="capitalize">edit profile</span></button></div>}
                {(user_info?._id!=props?.param_id)  && <div onClick={()=>followHandler()}><button className="border-1 border-white px-3 py-1 rounded-full flex flex-row justify-center items-center hover:bg-gray-700 cursor-pointer"><span className="capitalize">{f_text}</span></button></div>}

            </div>
        </div>

    )
}

function PersonalInfo(){
    const user_info=useSelector((state)=>state.user.profile)
    return(
        <div className="w-full flex flex-col p-2 mt-1">
            <div><span className="font-bold sm:text-lg lg:text-2xl">{user_info.name}</span></div>
            <div><span className="text-sm text-gray-300">{`@${user_info.user_name}`}</span></div>
            <div className="line-clamp-2 w-full text-justify"><span className="sm:text-md md:text-lg lg:text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet eaque nobis, adipisci voluptates optio nam labore nisi vel in aliquam blanditiis, ut mollitia ex voluptatem commodi dolorum unde expedita necessitatibus deleniti porro. Iusto quisquam dolores tempora animi, rerum consectetur eligendi numquam deserunt iste eos nobis esse suscipit, odio delectus quidem.</span></div>
        </div>
    )
}

export default function Profile(){
    const {viewID}=useParams()
    useGetProfile(viewID);

    const user_info=useSelector((state)=>state.user.profile);

    if(!user_info){
        return(
            <div>Loading...</div>
        )
    }
    return(
        <div className="bg-black w-[50%] h-full border-l-[1px] border-r-[1px] border-white flex flex-col">
            <ProfileTopMost/>
            <ProfileImage param_id={user_info?._id}/>
            <PersonalInfo/>
        </div>
    )
}