const mongoose = require("mongoose");
const fs = require('fs');
const User = require("../models/User");
const path = require('path');

const getUserInfo = async (req, res) => {
  try {
    console.log("*******user Info request recieved ******");
    const { id } = req.user;
    console.log("userId==>", id);
    const userInfo = await User.findById(id);
    if (!userInfo) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    const info = {
      firstName: userInfo?.firstName,
      lastName: userInfo?.lastName,
      email: userInfo?.email,
      profilePic:userInfo?.profilePic
    };

    res.json({
      userInfo: info
    });
    }
     catch(err) {
    res.json({
      message: err,
    });
  }
}

const userProfile = async (req,res)=>{
  try{
    const {id} = req.user;
    const user = await User.findById(id);
    if(req.file && user){
      const oldImage = user.profilePic;
      if(oldImage){
        console.log("oldImage....")
        const oldPath =  path.join(__dirname,"../uploads",oldImage);
        console.log("oldPath===>",oldPath)
        if(fs.existsSync(oldPath)){
          console.log('file deleted..');
          fs.unlinkSync(oldPath);
        }
      }
    }
    console.log("user PRofile request",req.body)
    const profilePic =  req.file ? req.file.filename : null;
    console.log("profile photo inside user profile ==>",profilePic)

     const userInfo = await User.findByIdAndUpdate(id,{profilePic},{new:true});
    console.log(user);
    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }
    res.json({
      userProfile:userInfo.profilePic
    })
  }catch(err){    
    res.json({
      message:err
    })
  }
}

module.exports = { getUserInfo, userProfile};
