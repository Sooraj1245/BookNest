import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const isConnected=false;

const connectDB = async ()=>{
    if (isConnected) return;
    try{
        await mongoose.connect(process.env.MONGOURI);
        console.log("Connected to DB")
    }catch(e){
        console.log(e)
    }
}

export default connectDB;