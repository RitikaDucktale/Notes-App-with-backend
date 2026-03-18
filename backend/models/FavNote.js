const mongoose = require('mongoose');

const FavNoteSchema = new mongoose.Schema({
    noteId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Note",
        required: true
    },
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
});

const FavNote =  mongoose.model('FavNote',FavNoteSchema);

module.exports = FavNote; 


