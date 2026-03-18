const fs = require("fs");
const mongoose = require("mongoose");
const Note = require("../models/Note");
const FavNote = require("../models/FavNote");

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id,
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNotes = async (req, res) => {
  try {
    console.log("Notes controller use id..", req.user);
    if (!req.body) {
      return res.status(401).json({
        message: "body is empty",
      });
    }
    const { title, content } = req.body;

    const note = await Note.create({
      title: title,
      content: content,
      userId: req.user.id,
    });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(500).json({ message: "id is not present!" });
    const data = req.body;
    if (!data) {
      return res
        .status(500)
        .json({ message: "data for updation is not present!" });
    }
    console.log("put req recieved..", id, data);
    const updatedNote = await Note.findByIdAndUpdate(
      { _id: id, userId: req.user.id },
      data,
      { new: true },
    );
    res.json(updatedNote);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req received in deleteNotes..", req.params, req.body);
    const deleteNote = await Note.findByIdAndDelete({
      _id: id,
      userId: req.user.id,
    });
    if (!deleteNote) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json({
      message: "Note deleted successfuly",
      deleteNote,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const favsToggler = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    console.log("id....", id);
    console.log("favstoggler req received..", req.params);

    const existingNote = await FavNote.findOne({
      noteId: id,
      userId: req.user.id,
    });

    if (!existingNote) {
      await FavNote.create({ noteId: id, userId: userId });
      return res.status(201).json({
        message: "Added to favourites",
        noteId: id,
      });
    } else {
      await FavNote.findOneAndDelete({ noteId: id, userId: userId });
      res.json({
        message: "Removed from favourites",
        noteId: id,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

const getFavNotes = async (req, res) => {
  const { id } = req.user;
  console.log("id*****,", id);
  const favCollection = await FavNote.find({ userId: id });
  const favNotesIds = favCollection.map((note) => note.noteId);
  console.log(favNotesIds);
  res.json({
    succes: true,
    favNotesIds,
  });
};

module.exports = {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  favsToggler,
  getFavNotes,
};
