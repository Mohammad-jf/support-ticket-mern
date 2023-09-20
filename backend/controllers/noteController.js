const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = requier("../models/noteModel");

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

  if (ticket.user.toString() !== user) {
    res.status(401);
    throw new Error("user not Authorized");
  }

  const notes = await Note.find({ ticket: req.params.id });

  res.status(200).json(notes);
});

module.exports = { getNotes };
