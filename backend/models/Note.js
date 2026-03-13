const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    isFavs:{
        type:Boolean,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

const Note = mongoose.model("Note",notesSchema);
module.exports = Note;

