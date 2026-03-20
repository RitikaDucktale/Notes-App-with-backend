const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {getUserInfo,userProfile}   = require('../controllers/userController');
const upload = require('../middleware/multer');
const userRoutes = express.Router();

userRoutes.get('/',authMiddleware,getUserInfo);
userRoutes.post('/profile',authMiddleware,upload.single('userProfileImg'),userProfile);

module.exports = userRoutes;