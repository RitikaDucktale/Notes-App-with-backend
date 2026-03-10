const fs = require('fs');

const Note = require('../models/Note');

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
  const notes = await Note.find();
  res.json(notes);
};

const createNotes =async (req,res)=>{
    if(!req.body){
        return res.status(401).json({
            message:"body is empty"
        })
    }
    try{

        const {title,content,isFavs} = req.body;
        
        const note = await Note.create({
            title, content,isFavs
        })
        res.json(note)
    }catch(err){
        res.status(500).json({message:err.message});

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
}

module.exports = {getNotes, createNotes};