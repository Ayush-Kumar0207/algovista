const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

// Get all problems for a user
router.get("/", async (req, res) => {
  const problems = await Problem.find({ user: req.user.id });
  res.json(problems);
});

// Add or update a problem
router.post("/", async (req, res) => {
  const { title, link, topic, difficulty, status } = req.body;
  const problem = new Problem({ title, link, topic, difficulty, status, user: req.user.id });
  await problem.save();
  res.json(problem);
});

// Update problem status
router.put("/:id", async (req, res) => {
  const problem = await Problem.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(problem);
});

module.exports = router;
