const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

// GET /api/recommend?userId=<optional>
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    // Fetch all problems for this user
    const problems = await Problem.find(userId ? { userId } : {});

    if (!problems.length) return res.status(200).json([]);

    // Grouping by status
    const unsolved = problems.filter(p => p.status === "unsolved");
    const bookmarked = problems.filter(p => p.status === "bookmark");
    const solved = problems.filter(p => p.status === "solved");

    // Unique topics sorted by least solved
    const topicCount = {};
    solved.forEach(p => {
      topicCount[p.topic] = (topicCount[p.topic] || 0) + 1;
    });

    const leastPracticedTopic = Object.entries(topicCount)
      .sort((a, b) => a[1] - b[1])[0]?.[0];

    // Pick recommendations
    const recommendations = [];

    // 1. One unsolved problem (random)
    if (unsolved.length) {
      const randomUnsolved = unsolved[Math.floor(Math.random() * unsolved.length)];
      recommendations.push(randomUnsolved);
    }

    // 2. One from least practiced topic
    if (leastPracticedTopic) {
      const fromLeastTopic = problems.find(
        p => p.topic === leastPracticedTopic && p.status !== "solved"
      );
      if (fromLeastTopic) recommendations.push(fromLeastTopic);
    }

    // 3. One bookmarked
    if (bookmarked.length) {
      const bookmarkedProblem = bookmarked[0];
      recommendations.push(bookmarkedProblem);
    }

    // 4. One hard problem
    const hardProblem = problems.find(
      p => p.difficulty === "Hard" && p.status !== "solved"
    );
    if (hardProblem) recommendations.push(hardProblem);

    // Return unique by _id
    const unique = [...new Map(recommendations.map(p => [p._id.toString(), p])).values()];
    res.status(200).json(unique);
  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
});

module.exports = router;
