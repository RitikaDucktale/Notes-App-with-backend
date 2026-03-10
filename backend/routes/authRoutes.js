require('dotenv').config();

const express = require("express");
const fs = require("fs");

const {signup,login} = require('../controllers/authController');
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
