const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  title: String,
  link: String,
  topic: String,
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  status: { type: String, enum: ["unsolved", "solved", "bookmark"], default: "unsolved" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Problem", ProblemSchema);
