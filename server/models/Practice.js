const mongoose = require("mongoose");

const PracticeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  platform: String, // "LeetCode", "Codeforces"
  difficulty: String, // "Easy", "Medium", "Hard"
  topic: String, // "Graphs", "DP"
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Practice", PracticeSchema);
