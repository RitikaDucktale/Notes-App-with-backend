const express = require('express');
const fs = require('fs');

const authMiddleware = require('../middleware/authMiddleware');
const {getNotes , createNotes,updateNotes, deleteNotes,favsToggler,getFavNotes} = require('../controllers/notesController');
const notesRouter = express.Router();

notesRouter.get('/notes',authMiddleware,getNotes)

notesRouter.post('/notes',authMiddleware,createNotes)

notesRouter.put('/notes/:id',authMiddleware,updateNotes);
notesRouter.delete('/notes/:id',authMiddleware,deleteNotes);

notesRouter.post('/notes/favourites/:id',authMiddleware,favsToggler);

notesRouter.get('/notes/favourites',authMiddleware,getFavNotes);
module.exports = notesRouter;