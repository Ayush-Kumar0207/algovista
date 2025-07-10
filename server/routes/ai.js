const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

// Rule-based AI recommender
router.post("/recommend", auth, async (req, res) => {
  const { prompt } = req.body;

  try {
    // Simple rules engine
    const recommendations = [];

    if (prompt.includes("graph")) {
      recommendations.push("Codeforces 510C – Fox And Names");
      recommendations.push("LeetCode 133 – Clone Graph");
    }
    if (prompt.includes("dp")) {
      recommendations.push("LeetCode 1143 – Longest Common Subsequence");
      recommendations.push("AtCoder Educational DP Contest – Frog Jump");
    }
    if (prompt.includes("tree")) {
      recommendations.push("LeetCode 105 – Construct Binary Tree");
    }

    if (recommendations.length === 0) {
      recommendations.push("LeetCode 1 – Two Sum");
    }

    res.json({ suggestions: recommendations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
