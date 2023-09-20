const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const NoteModel = require("../models/noteModel");

// @desc get tickets notes
// @route GET /api/tickets/:ticketId/notes
// @access private

const getNotes = asyncHandler(async (req, res) => {
  // get user using the id & jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not Authorized");
  }

  const notes = await NoteModel.find({ ticket: req.params.id });

  res.status(200).json(notes);
});

// @desc create new note
// @route POST/api/tickets/:ticketId/notes
// @access private

const createNote = asyncHandler(async (req, res) => {
  // get user using the id & jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not Authorized");
  }

  const note = await NoteModel.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.id,
    user: req.user.id,
  });

  res.status(200).json(note);
});

module.exports = { getNotes, createNote };
