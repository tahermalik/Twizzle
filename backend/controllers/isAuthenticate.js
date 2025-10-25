import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path:"../.env"})
export async function check(req,res,next){
    try{
        // console.log("req object data ",req)
        const {token}=req.cookies;
        // console.log("printing cookie data")
        // console.log(req.cookies)
        if(!token){
            console.log("cookie not received")
            return res.status(401).json({message:"user not authenticated"})
        }
        const result=jwt.verify(token,process.env.JWT_SECRET);
        // console.log(result)
        req.user_info=result;
        next();
    }catch(error){
        console.log(error);
        return res.status(500).send("error")
    }
}