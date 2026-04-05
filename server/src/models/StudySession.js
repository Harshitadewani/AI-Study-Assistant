const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String, // "2026-03-25"
  },
  hours: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("StudySession", studySessionSchema);