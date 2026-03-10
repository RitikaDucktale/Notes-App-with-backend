require('dotenv').config();
const express = require("express");
const jwt = require('jsonwebtoken');

const router = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            message:"No token provided!"
        })
    }
    const token = authHeader.split(" ")[1];
   try{
    console.log('inside try block...')
       const decoded = jwt.verify(token,secretKey);
       console.log("decodes..",decoded)
       req.user = decoded;
       console.log("AUTH SUCCESS → moving to route");
       next();
   }catch(err){ 
    console.log('catch block..')
        return  res.status(401).json({
        message:"Invalid or expires token!"
    })
   }

}

module.exports = authMiddleware;