const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const secretKey = "mySecretkey";

router.post("/signup", (req, res) => {

  if (!req.body) {
    return res.json({
      message: "req is empty",
    });
  }

  let users = [];   //to parse ans store json data from users.json file

  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.log("File read error");
    } else {
      users = data.toString() ? JSON.parse(data) : [];
      console.log("users==", users);
    }

    users.push(req.body); //push signup data came from post api

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
});

router.post("/login", (req, res) => {
  if (!req.body) {
    console.log("body is empty in login");
    return;
  }

  const { email, password } = req.body;

  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error reading file");
    }

    let users = data.toString() ? JSON.parse(data) : [];

    if (users.length) {
      console.log("users existss==>", users);
      const loginUser = users.find(
        (user) => user.email === email && user.password === password,
      );
    
      if (loginUser) {
        const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

        return res.json({
          message: "Login Successfull",
          token: token,
        });
      } 
      else {
        return res.status(401).json({
          message: "User not found",
        });
      }
    } else {
      console.log("users not exists==>", users);
    }
  });
});

module.exports = router;
