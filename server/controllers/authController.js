import User from "../schemas/userSchema.js";
import connectDB from "../mongo.js";
import argon2 from "argon2";

export async function signIn(req,res) {
    await connectDB();
    const {userName,userPass}=req.body.datasent;
    try {
        const existing = await User.findOne({userName:userName});
        console.log(existing.password)
        const passValidity=await argon2.verify(existing.password,userPass);
        console.log(passValidity);
        if (passValidity){
            return res.status(200).send({success:true});
        }else{
            return res.status(500).send({error:"Error: Username/Password Incorrect"});
        }
    } catch (error) {
        
    }
}

export async function signUp(req,res) {
    await connectDB();
    const {userName,userPass}=req.body.datasent;

    try {
        const existing=await User.findOne({userName:userName});
        if (existing) return res.status(500).send({error:"Error: The Username is Taken"});
        const hashPass= await argon2.hash(userPass);
        const newUser=new User({userName:userName,password:hashPass});
        await newUser.save();
        return res.status(200).send({success:true});
    } catch (error) {
        res.status(500).send({error:`System Error: ${error.message}`});
    }
    
}