const express = require('express');
const fs = require('fs');

const authMiddleware = require('../middleware/authMiddleware');
const {getNotes , createNotes} = require('../controllers/notesController');
const notesRouter = express.Router();

notesRouter.get('/notes',authMiddleware,getNotes)

notesRouter.post('/notes',authMiddleware,createNotes)

module.exports = notesRouter;