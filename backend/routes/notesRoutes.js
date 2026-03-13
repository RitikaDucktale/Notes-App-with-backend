const express = require('express');
const fs = require('fs');

const authMiddleware = require('../middleware/authMiddleware');
const {getNotes , createNotes,updateNotes, deleteNotes,favsToggler} = require('../controllers/notesController');
const notesRouter = express.Router();

notesRouter.get('/notes',authMiddleware,getNotes)

notesRouter.post('/notes',authMiddleware,createNotes)

notesRouter.put('/notes/:id',authMiddleware,updateNotes);
notesRouter.delete('/notes/:id',authMiddleware,deleteNotes);

notesRouter.patch('/notes/:id',authMiddleware,favsToggler);

module.exports = notesRouter;