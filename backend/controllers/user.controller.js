const User=require('../models/user.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

 const register=async (req,res)=>{
    try{
        const {fullname,email,password}=req.body;
        if(!fullname || !email || !password){
            return res.status(400).json({
                message: "All fields are required.",
                success:false
            })
        }
        const user=await User.findOne({email});
        if(user){
            return res.json({
                message: "User already exists.",
                success:false
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            password:hashedPassword
        });
        res.json({
            message: "User registered successfully.",
            success:true
        });
    }
    catch(err){
        console.error("Error in registration:", err);
        return res.status(500).json({
            message: "Internal server error.",
            success:false
        });
    }
}

 const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email ||!password){
            return res.status(400).json({
                message: "All fields are required.",
                success:false
            })
        };

        const user=await User.findOne({email});
        if(!user){
            return res.status(201).json({
                message:"incorrect email or password",
                success:false
            })
        };

        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(201).json({
                message:"incorrect email or password",
                success:false
            })
        };

        const tokenData={
            userId:user._id
        }
        const token=jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"});
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`Welcome Back ${user.fullname}`,
            user:{
                _id:user._id,
                fullname:user.fullname,
                email:user.email
            },
            success:true,
        })
    }
    catch(err){
        console.error("Error in login:", err);
    }
}

 const logout=async (req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            messsage:"User logged Out Successfully",
            success:true 
        })
    }
    catch(err){
        console.error("Error occured",err);
    }
}

module.exports = {register,login,logout}