import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path:"../config/.env"})
async function DBConnection(){
    const conn=await mongoose.connect(process.env.DB_URI);
}

export default DBConnection;