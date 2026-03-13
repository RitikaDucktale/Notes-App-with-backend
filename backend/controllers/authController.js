const fs = require('fs');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = process.env.JWT_SECRET_KEY;
const User = require('../models/User');

const signup = async (req, res) => {
  const {email,password} = req.body;
  if(!email || !password){
    return res.status(400).json({
      message:"Email and password are required"
    })
  }

  try{
    const existingUser = await User.findOne({email}); // returns promise..
    if(existingUser){
      console.log(true
      )
     return res.status(400).json({
        message:"User already exists . Please Login"
      })
    }
    const hashedPassword = await hashPass(password);
    console.log("hash pass...",hashedPassword)
   const user = await User.create({ email,password: hashedPassword})
  //  console.log(user)
   res.json({
     user,
     message:"User signup successfully"})
  }
  catch(err){

    res.status(500).json({
      message:err
    })
    console.log(err)
  }
  // let users = [];   //to parse ans store json data from users.json file

  // fs.readFile("users.json",  async (err, data) => {
  //   if (err) {
  //     console.log("File read error");
  //   } else {
  //     users = data.toString() ? JSON.parse(data) : [];
  //     console.log("users==", users);
  //   }

  //    users.push({email:email,password:await hashPass(password)}); //push signup data came from post api

  //   fs.writeFile("users.json", JSON.stringify(users), (err) => {
  //     if (err) {
  //       return res.status(500).json({
  //         message: "error saving user",
  //       });
  //     }
  //     res.json({
  //       message: "User signed up succesfully",
  //     });
  //   });
  // });
}

const hashPass = async (password)=>{
   const hashedPassword = await  bcrypt.hash(password,10);
   console.log(hashedPassword)
   return hashedPassword;
}

const login = async (req, res) => {
  if (!req.body) {
    console.log("body is empty in login");
    return;
  }
  try{
    const { email, password } = req.body;
    console.log(req.body)
    const user = await User.findOne({email});

    if(!user){
     return res.status(404).json({
        message:"user not found"
      })
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
     return res.status(404).json({
        message:"Invalid email or password!"
      })
    }

    const token = await jwt.sign({id:user.id,email:email},secretKey,{expiresIn:"1h"})
    console.log("inside login user id...",user.id)
    res.json({
      message:"user login successfully",
      token:token
    })

  }catch(err){
    return res.status(500).json({
      message:err
    })
    console.log(err)
  }
}

module.exports = {signup, login};