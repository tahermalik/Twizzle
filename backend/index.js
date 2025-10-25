import express from "express";
import dotenv from "dotenv";
import DBConnection from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import tweetRouter from "./routes/tweetRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";



//// used to seperate code and configuration so that the code can become universal irrespective of the platform
dotenv.config({
    "path":".env"
})

DBConnection().then(()=>console.log("database connected")).catch(()=>console.log("error occured while connection"))

/// specifying from where the request will come from
const corsOption={
    origin:"http://localhost:3000",
    credentials:true /// it is for cookies
}
const app=express();
app.use(cors(corsOption))
//// to parse if the user send that json data 
app.use(express.json());

// to parse the if the user send the data via URL
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.listen(process.env.PORT,()=>console.log(`server is listening at ${process.env.PORT}`))

app.use("/api/t1/user",userRouter());
app.use("/api/tweet",tweetRouter());
