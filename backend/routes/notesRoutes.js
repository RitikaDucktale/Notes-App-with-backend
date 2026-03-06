const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const notesRouter = express.Router();

notesRouter.get('/notes',authMiddleware,(req,res)=>{
    res.json({
        message:"Welcome",
        user: req.user
    })
})

module.exports = notesRouter;