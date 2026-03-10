const fs = require('fs');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = process.env.JWT_SECRET_KEY;

const signup = (req, res) => {
  console.log('logs in sign in');
  const {email,password} = req.body;
  if (!req.body) {
    return res.json({
      message: "req is empty",
    });
  }

  let users = [];   //to parse ans store json data from users.json file

  fs.readFile("users.json",  async (err, data) => {
    if (err) {
      console.log("File read error");
    } else {
      users = data.toString() ? JSON.parse(data) : [];
      console.log("users==", users);
    }

     users.push({email:email,password:await hashPass(password)}); //push signup data came from post api

    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({
          message: "error saving user",
        });
      }
      res.json({
        message: "User signed up succesfully",
      });
    });
  });
}

const hashPass = async (password)=>{
   const hashedPassword = await  bcrypt.hash(password,10);
   console.log(hashedPassword)
   return hashedPassword;
}

const login = (req, res) => {
  if (!req.body) {
    console.log("body is empty in login");
    return;
  }

  const { email, password } = req.body;

  fs.readFile("users.json", "utf-8", async (err, data) => {
    if (err) {
      console.log("error reading file");
    }

    let users = data.toString() ? JSON.parse(data) : [];
     const user = users.find(user=>user.email===email);
     if(!user){
         return res.status(401).json({
          message: "User not found",
         })
     }

     const isMatch = await bcrypt.compare(password,user.password);

     if(!isMatch){
      return res.status(401).json({
        message:"Invalid Password"
      })
     }
       
      const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

        return res.json({
          message: "Login Successfull",
          token: token,
        });
      });
    }

module.exports = {signup, login};