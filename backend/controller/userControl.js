const Users=require('../model/userDetails')
const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const jwtSecretKey ="user123";

const addUser =async (req,res)=>{
    try {
        const {image,name,userid,status,role,email,team,dob,
            gender,nationality,contact,wrkemail}=req.body;

        const users=new Users({image:image,name:name,userid:userid,status:status,role:role,email:email,team:team,dob:dob,
            gender:gender,nationality:nationality,contact:contact,wrkemail:wrkemail});
        await users.save();
        res.json({message:"User added successfully"});
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
};

const updateUser = async (req,res)=> {
    try {
        const {id}=req.params;
        const {image,name,userid,status,role,email,team,dob,
            gender,nationality,contact,wrkemail}=req.body;
        const users=await Users.findByIdAndUpdate(
            id,
            {image,name,userid,status,role,email,team,dob,gender,nationality,contact,wrkemail},
            {new:true}
        );
        res.json(users)    
    } catch (error) {
        res.status(400).json({error:error.message});

    }
};


const deleteUser = async(req,res)=>{
    try {
        const {id}=req.params
        await Users.findByIdAndDelete(id);
        res.json({message:"Product deleted successfully"});
    } catch (error) {
        res.status(400).json({error:error.message});   
    }
};

const getAlldata=async(req,res)=>{
    try {
        const users=await Users.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
};

module.exports={
   addUser,
   updateUser,
   deleteUser,
   getAlldata
  }