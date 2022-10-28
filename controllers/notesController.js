const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Note = require('../models/Note');

// @desc Get all Notes
// @route GET /notes
// @access Private

const getAllNotes = asyncHandler(async (req, res) => {
  //Get all notes from MongoDB
  const notes = await Note.find().lean();

  //If no notes are available
  if (!notes) {
    return res.status(400).json({ message: 'No notes found!' });
  }

  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await Use.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );

  res.json(notesWithUser);
});

// @desc Create new Notes
// @route Post /notes
// @access Private

const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = text.body;

  //Confirm all frields are availabe
  if (!user || !title || !text) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  //Check for duplicate
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate note title' });
  }

  //Create and sotre a new note
  const note = await Note.create({ user, title, text });

  if (note) {
    //Created
    return res.status(200).json({ message: 'New Note Created' });
  } else {
    return re.status(400).json({ message: 'Invalid Note Data Received' });
  }
});

// @desc Update  Notes
// @route PATCH /notes
// @access Private

const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  //Confirm Data
  if (!id || !user || !title || !text || typeof completed !== 'boolean') {
    return re.status(400).json({ message: 'All fields are required' });
  }

  //Confirm Note exists to update
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: 'Note not found' });
  }

  //Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec();

  //Allow renaming of the original note
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate note title' });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();

  res.json(`'${updatedNote.title}' updated`);
});

// @desc Delete  Notes
// @route DELETE /notes
// @access Private

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  //Confirm Data
  if (!id) {
    return req.status(400).json({ message: 'Note ID required' });
  }

  //Confrim note exits to delete
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: 'Note not found' });
  }

  const result = await note.deleteOne();
  const reply = `Note '${result.title} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
};
