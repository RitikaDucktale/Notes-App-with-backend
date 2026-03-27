const express = require('express');
const fs = require('fs');

const authMiddleware = require('../middleware/authMiddleware');
const {getNotes , createNotes,updateNotes, deleteNotes,favsToggler,getFavNotes} = require('../controllers/notesController');
const validate = require('../middleware/validationMiddleware');
const {createNotesSchema, editNotesSchema}  = require('../validations/notesValidation');

const notesRouter = express.Router();

notesRouter.get('/',authMiddleware,getNotes)

notesRouter.post('/',authMiddleware,validate(createNotesSchema),createNotes)

notesRouter.put('/:id',authMiddleware,validate(editNotesSchema),updateNotes);
notesRouter.delete('/:id',authMiddleware,deleteNotes);

notesRouter.post('/favourites/:id',authMiddleware,favsToggler);

notesRouter.get('/favourites',authMiddleware,getFavNotes);
module.exports = notesRouter;