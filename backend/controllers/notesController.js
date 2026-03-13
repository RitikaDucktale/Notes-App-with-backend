const fs = require("fs");
const mongoose = require('mongoose');
const Note = require("../models/Note");

// const getNotes = (req,res)=>{
//     fs.readFile('notesData.json','utf-8',(err,data)=>{
//         if(err){
//             res.status(401).json({message:"error reading notes file."})
//         }
//          const notes = data.toString()? JSON.parse(data) : [];
//          return res.json({
//             notes:notes
//          })

//     });
// }

const getNotes = async (req, res) => {
  const notes = await Note.find({
    userId : req.user.id
});
  res.json(notes);  
};

const createNotes = async (req, res) => {
    console.log("Notes controller use id..",req.user)
  if (!req.body) {
    return res.status(401).json({
      message: "body is empty",
    });
  }
  try {
    const { title, content, isFavs } = req.body;

    const note = await Note.create({
      title:title,
      content:content,
      isFavs:isFavs,
      userId : req.user.id
    });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  //    fs.readFile('notesData.json','utf-8',(err,data)=>{
  //     if(err) console.log('error reading notes file');
  //    const notes = (!err && data.toString())? JSON.parse(data) : [];
  //    notes.push(req.body);

  //    fs.writeFile('notesData.json',JSON.stringify(notes),(err)=>{
  //     if(err){
  //         console.log("File writing error..")
  //     }
  //     return res.json({
  //         message:"notes created successfully.."
  //     })
  //    })
  //    })
  //    res.json({message:"note created.."})
};

const updateNotes = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log("put req recieved..", id, data);
  const updatedNote = await Note.findByIdAndUpdate({_id:id, userId:req.user.id}, data, { new: true });
  res.json(updatedNote);
};

const deleteNotes = async (req, res) => {
  const { id } = req.params;
  console.log("req received in deleteNotes..", req.params, req.body);
  const deleteNote = await Note.findByIdAndDelete({_id:id, userId:req.user.id});
  if (!deleteNote) {
    res.status(404).json({
      message: "Not found",
    });
  }
  res.json({
    message: "Note deleted successfuly",
    deleteNote,
  });
};

const favsToggler = async (req, res) => {
    console.log('rq.id....',req.user.id)
  console.log("patch favstoggler .");
  try {
    const {id} = req.params;
    console.log('id....',id)
    console.log("favstoggler req received..", req.params);

    const note1 = await Note.findById(id);
    console.log("note1==>>",note1)
    const note = await Note.findOne({
        _id:id,
        userId:req.user.id
    })
    console.log("note.....",note)
  if(!note){
    res.status(401).json({
        message:"Note not found"
    })
  }

    note.isFavs = !note.isFavs;
    await note.save();
    console.log("request sent..",note)
    res.json(note);

  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

module.exports = {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  favsToggler,
};
