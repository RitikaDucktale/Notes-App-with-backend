require('dotenv').config();

const express = require("express");
const fs = require("fs");

const {signup,login} = require('../controllers/authController');
const {signUpSchema,loginSchema} = require('../validations/authValidations');
const validate = require('../middleware/validationMiddleware');
const router = express.Router();

router.post("/signup",validate(signUpSchema),signup);
router.post("/login", validate(loginSchema),login);

module.exports = router;
