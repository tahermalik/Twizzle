import axios from "axios";
import { useEffect } from "react";
import { TWEET_API_END_POINTS } from "../utils/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/slices/tweetSlice";
import store from "../redux/store";

export default function useGetAllTweets(){
    const dispatch=useDispatch();
    async function getTweets(){
        try{
            const res=await axios.get(`${TWEET_API_END_POINTS}/getAllTweets`,{withCredentials:true})
            // console.log(res.data.all_tweets)
            dispatch(getAllTweets(res.data.all_tweets))

        }catch(error){
            console.log("errrorrrrrr")
            console.log(error)
        }
    }

    async function getFollowingTweets(){
        try{
            const res=await axios.get(`${TWEET_API_END_POINTS}/getFollowingTweets`,{withCredentials:true})
            // console.log(res.data.all_tweets)
            dispatch(getAllTweets(res.data.all_tweets))

        }catch(error){
            console.log("errrorrrrrr")
            console.log(error)
        }
    }


    useEffect(()=>{
        const currentActive=store?.getState()?.tweet?.isActive;
        if(currentActive) getTweets();
        else getFollowingTweets();
    },[])

    const fetchTweets = async () => {
        const currentActive=store?.getState()?.tweet?.isActive;
        if(currentActive) await getTweets();
        else await getFollowingTweets();
        // active=useSelector((state)=>state.tweet.isActive)
    };
    return fetchTweets
}