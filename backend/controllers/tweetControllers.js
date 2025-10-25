import { tweetData } from "../models/tweetSchema.js";
import { userData } from "../models/userSchema.js";

export async function createTweet(req,res){
    const {description,name}=req.body;
    const {username,id}=req.user_info;
    console.log(req.body);
    if(!description){
        return res.status(401).json({message:"All the field are mandatory"})
    }

    console.log(username);

    // creating a tweet
    const tweet=new tweetData({
        user_id:id,
        description:description,
        name:name,
        username:username
    })
    tweet.save();

    res.status(201).json({message:"tweet created successfully"})
}

export async function deleteTweet(req,res){
    const {id}=req.params;
    if(!id){
        return res.status(401).json({message:"pass the id of the tweet to delete"})
    }
    await tweetData.findByIdAndDelete(id);
    return res.status(201).json({message:"tweet deleted successfully"})
}

export async function likeOrDislike(req,res){
    try{
        // console.log("hello")
        const user_id=req.user_info.id; // getting the authenticated user id
        const tweet_id=req.params.id;

        console.log("user id of tweet :- ",tweet_id)
    
        const tweet_info=await tweetData.findById(tweet_id);
        // console.log(tweet_info)
        if(tweet_info.like.includes(user_id)){
            tweet_info.like=tweet_info.like.filter(id=>id.toString()!=user_id.toString());
            tweet_info.save();
            return res.status(200).json({message:"Dislike done successfully",tweet_info})
        }
        else {
            tweet_info.like.push(user_id);
            tweet_info.save();
            return res.status(200).json({message:"like done successfully",tweet_info})
        }
        
    }catch(error){
        console.log(error);
    }
}

export async function getAllTweets(req,res){
    try{
        let counter=0;
        // console.log("inside the all")
        // console.log("trying to fetch all user tweets");
        const logged_user_id=req.user_info.id;
        let all_tweets={};
        /// finding out all the tweets of the logged in person
        let tweet_info=await tweetData.find({user_id:logged_user_id})
        for(let i=0;i<tweet_info.length;i++){
            all_tweets[`tweet_${++counter}`]=tweet_info[i];
        }

        // console.log(all_tweets)

        // finding out all the tweets of person followed by logged in user
        const logged_user_data=await userData.findById(logged_user_id)
        const following_user_id=logged_user_data.following
        const follower_user_id=logged_user_data.followers

        const person_id=follower_user_id;
        for(let i=0;i<following_user_id.length;i++){
            if(!person_id.includes(following_user_id[i])){
                person_id.push(following_user_id[i]);
            }
        }

        for(let i=0;i<person_id.length;i++){
            // console.log("Hello")
            tweet_info=await tweetData.find({user_id:person_id[i]});
            for(let j=0;j<tweet_info.length;j++) all_tweets[`tweet_${++counter}`]=tweet_info[j];
        }

        // console.log(all_tweets)
        /// successfully able to get complete information about all tweets
        // sending all the tweet
        return res.status(200).json({message:`successfully able to get all the data about the tweets for ${req.user_info.user_name}`,all_tweets})


        

        
    }catch(error){
        console.log(error);
    }
}

export async function getFollowingTweets(req,res){
     try{
        console.log("inside the following")
        let counter=0;
        console.log("trying to fetch all user tweets");
        const logged_user_id=req.user_info.id;
        let all_tweets={};
        
        // finding out all the tweets of person followed by logged in user
        const logged_user_data=await userData.findById(logged_user_id)
        const following_user_id=logged_user_data.following
        
        let person_id=following_user_id;
        let tweet_info={}

        for(let i=0;i<person_id.length;i++){
            // console.log("Hello")
            tweet_info=await tweetData.find({user_id:person_id[i]});
            for(let j=0;j<tweet_info.length;j++) all_tweets[`tweet_${++counter}`]=tweet_info[j];
        }

        // console.log(all_tweets)
        /// successfully able to get complete information about all tweets
        return res.status(200).json({message:`successfully able to get all the data about the tweets for ${req.user_info.user_name}`,all_tweets})        
    }catch(error){
        console.log(error);
    }
}