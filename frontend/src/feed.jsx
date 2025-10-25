import { useDispatch, useSelector } from "react-redux";
import "./custom.css";
import useGetAllTweets from "./hooks/useGetAllTweets.js";
import { useState } from "react";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { TWEET_API_END_POINTS } from "./utils/endpoints.js";
import { getAllTweets, setIsActive } from "./redux/slices/tweetSlice.js";

function TopMost() {
    const dispatch=useDispatch();
    const active=useSelector((state)=>state.tweet.isActive)
    const fetchTweets=useGetAllTweets();
    async function forYouHandler(){
        try{
            dispatch(setIsActive(true))
            fetchTweets();
            toast.success("All tweets for you")
        }catch(error){
            toast.error("something went wrong")
            console.log(error);
        }
    }

    async function followingHandler(){
        try{
            dispatch(setIsActive(false))
            fetchTweets();
            toast.success("All tweets of the person to who you are following")

        }catch(error){
            toast.error("something went wrong")
            console.log(error);
        }
    }
    
    return (
        <div className="flex flex-row h-[7%] border-b-[1px] border-white sticky top-0 backdrop-blur-sm">
            <div onClick={()=>forYouHandler()} className="flex flex-col relative h-[100%] w-1/2 justify-center items-center sm:text-md md-text-lg lg:text-2xl hover:bg-gray-600 cursor-pointer">
                <div className="w-[50%] flex flex-row justify-center items-center"><span>For You</span></div>
                {active && <div className="w-[50%] h-[3px] bg-blue-800 absolute bottom-0 rounded-[2px]"></div>}
            </div>
            <div onClick={()=>followingHandler()} className="flex flex-col relative h-[100%] w-1/2 justify-center items-center sm:text-md md-text-lg lg:text-2xl hover:bg-gray-600 cursor-pointer">
                <div className="w-[50%] flex flex-row justify-center items-center"><span>Following</span></div>
                {!active && <div className="w-[50%] h-[3px] bg-blue-800 absolute bottom-0 rounded-[2px]"></div>}
            </div>
        </div>
    )
}

export function Icons(props) {
    return (
        <div className="flex flex-row items-center justify-center sm:h-[15px] sm:w-[15px] md:h-[17px] md:w-[17px] lg:h-[20px] lg:w-[20px] cursor-pointer">
            <img src={`${props.name}.svg`} alt={`${props.name}_logo`} />
        </div>
    )
}

export function MyImage(props) {
    return (
        <div className="flex flex-row justify-center items-center h-full">
            <div className=""><img className="w-[50px] h-[50px] object-contain rounded-full" src={`${props.name}.jpg`} alt="my_photo" /></div>
        </div>
    )
}

function Button(props) {
    const user_info = useSelector((state) => state.user.user)
    const refetch = useGetAllTweets()
    // console.log("user_info",user_info.name)
    async function setTweetData() {
        console.log("Inisde button function")
        try {
            if (props.description === "" | props.description.trim() === "") toast.error("empty tweet cant be done")
            else {
                const res = await axios.post(`${TWEET_API_END_POINTS}/create_tweet`, { description: props.description, name: user_info.name }, { withCredentials: true })
                toast.success(res.data.message)
                refetch()
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong")
        }

    }
    return (
        <div className="cursor-pointer">
            <button onClick={() => setTweetData()} className="bg-[#787a7a] hover:bg-[#929595] sm:text-sm md:text-md lg:text-lg flex flex-row justify-center items-center pt-2 pb-2 pr-4 pl-4 rounded-2xl cursor-pointer">{props.info}</button>
        </div>
    )
}

function CreatePost() {
    const [desc, setDesc] = useState("");
    return (
        <div className="flex flex-row p-2 pt-4 pb-4 gap-3">
            <MyImage name="taher_malik" />
            <div className="flex flex-col gap-3 w-[80%]">
                <div><input value={desc} onChange={(e) => setDesc(e.target.value)} className="sm:text-md md:text-lg lg:text-2xl w-full outline-0" type="text" placeholder="What's Happening?" /></div>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2">
                        <Icons name="img_svg" />
                        <Icons name="gif" />
                        <Icons name="grok_2" />
                        <Icons name="poll" />
                        <Icons name="smiley" />
                    </div>
                    <div onClick={() => setDesc("")}><Button info="Post" description={desc} /></div>
                </div>
            </div>
        </div>
    )
}

function ShowPost() {
    return (
        <div className="w-full p-4 flex flex-row justify-center items-center border-t-[1px] border-b-[1px]">
            <span className="cursor-pointer"><a className="underline-offset-0 text-blue-500 sm:text-md md:text-lg lg:text-2xl" href="">Show Post</a></span>
        </div>
    )
}

function PostIcons(props) {
    // console.log("user",user_info)
    const update_tweets = useGetAllTweets();
    const user_info = useSelector((state) => state.user.user)
    async function likeOrDislikeHandler(tweet_id) {
        try {
            const res = await axios.put(`${TWEET_API_END_POINTS}/likeordislike/${tweet_id}`, {}, { withCredentials: true })
            toast.success(res.data.message)
            update_tweets();
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error);
        }
    }

    async function deleteHandler(tweet_id){
        try {
            const res = await axios.delete(`${TWEET_API_END_POINTS}/delete/${tweet_id}`,{withCredentials: true})
            toast.success(res.data.message)
            update_tweets();
        } catch (error) {
            toast.error("Something went wrong in delete")
            console.log(error);
        }
    }
    return (
        <div className="flex flex-row justify-evenly items-center mb-2">
            <div className="hover:bg-blue-800 rounded-full p-1 flex flex-row items-center justify-center gap-1">
                <Icons name="messages" />
                <div><span className="sm:text-sm md:text-md lg:text-lg">0</span></div>
            </div>
            <div className="hover:bg-yellow-600 rounded-full p-1 flex flex-row items-center justify-center gap-1">
                <Icons name="repeat_svg" />
                <div><span className="sm:text-sm md:text-md lg:text-lg">0</span></div>
            </div>
            <div onClick={() => likeOrDislikeHandler(props.value._id)} className="hover:bg-red-600 rounded-full p-1 flex flex-row items-center justify-center gap-1">
                <Icons name="fav" />
                <div><span className="sm:text-sm md:text-md lg:text-lg">{props.value.like.length}</span></div>
            </div>
            <div className="hover:bg-blue-800 rounded-full p-1 flex flex-row items-center justify-center"><Icons name="bookmark_2" /></div>
            {
                props.value.user_id === user_info?._id && <div onClick={()=>deleteHandler(props.value._id)} className="hover:bg-green-600 rounded-full p-1 flex flex-row items-center justify-center"><Icons name="delete" /></div>
            }
        </div>
    )
}

function Post(props) {
    return (
        <div className="flex flex-row pl-2 pr-2 pt-4 gap-3 w-full border-b-[1px] border-white">
            <MyImage name={props.value.name} />
            <div className="flex flex-col w-[85%]">
                <div className="name"><span className="font-semibold sm:text-sm md:text-md lg:text-lg capitalize">{props.value.name}</span> <span className="sm:text-sm md:text-md text-gray-300">@{props.value.username}</span></div>
                <div>
                    <span className="line-clamp-4 text-justify">{props.value.description}</span>
                </div>

                {/* will work on this feature soon */}
                {/* <div className="mt-2 mb-2">
                    <img src={`${props.name}.jpg`} alt="emma_img" className="rounded-2xl"/>
                </div> */}

                <PostIcons value={props.value} />
            </div>
        </div>
    )
}

export default function Feed() {
    useGetAllTweets();
    const tweets = useSelector((state) => state.tweet.tweet);
    if (!tweets) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div className="border-l-[1px] border-r-[1px] bg-black w-[50%] h-full overflow-scroll no_scroll_bar">
            {/* {console.log("loading the feed component for the first time")} */}
            <TopMost />
            <CreatePost />
            <ShowPost />
            {
                Object.entries(tweets).map(([key, value]) => (
                    <Post value={value}></Post>
                ))
            }
        </div>
    )
}