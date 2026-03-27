const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {getUserInfo,userProfile}   = require('../controllers/userController');
const upload = require('../middleware/multer');
const userRoutes = express.Router();

userRoutes.get('/',authMiddleware,getUserInfo);
userRoutes.post('/profile',authMiddleware,(req, res, next) => {
  upload.single("userProfileImg")(req, res, function (err) {
    if(err){
    if(err.code === "LIMIT_FILE_SIZE"){
        return res.status(400).json({
            message: "Image must be less than 2MB"
        })
    }
    else{
      console.log("MULTER ROUTE ERROR =>", err.message);
      return res.status(400).json({ message: err.message });
    }
    }
    next();
  });
},userProfile);

module.exports = userRoutes;