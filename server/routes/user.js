const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {
  fetchLeetCodeStats,
  fetchCodeforcesStats,
} = require("../utils/fetchHandles");

// ✅ GET: User's basic handles (used in settings)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("leetcodeHandle codeforcesHandle");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err.message);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// ✅ PUT: Update LeetCode / Codeforces handles
router.put("/:id", async (req, res) => {
  try {
    const { leetcodeHandle, codeforcesHandle } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { leetcodeHandle, codeforcesHandle },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Handles updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating handles:", err.message);
    res.status(500).json({ error: "Failed to update handles" });
  }
});

// ✅ PUT: Sync LeetCode + Codeforces stats, save to DB
router.put("/:id/sync", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const lcStats = user.leetcodeHandle
      ? await fetchLeetCodeStats(user.leetcodeHandle)
      : null;

    const cfStats = user.codeforcesHandle
      ? await fetchCodeforcesStats(user.codeforcesHandle)
      : null;

    user.handles = {
      leetcode: {
        easy: lcStats?.easy || 0,
        medium: lcStats?.medium || 0,
        hard: lcStats?.hard || 0,
        total:
          (lcStats?.easy || 0) + (lcStats?.medium || 0) + (lcStats?.hard || 0),
      },
      codeforces: {
        rating: cfStats?.rating ?? null,
        maxRating: cfStats?.maxRating ?? null,
        rank: cfStats?.rank ?? "unrated",
        solvedCount: new Set(
          (cfStats?.submissions || [])
            .filter((sub) => sub.verdict === "OK" && sub.problem)
            .map((sub) => `${sub.problem.contestId}-${sub.problem.index}`)
        ).size,
        submissions: cfStats?.submissions || [],
      },
      lastSynced: new Date(),
    };

    await user.save();

    res.json({
      message: "Handles synced and saved successfully",
      handles: user.handles,
    });
  } catch (err) {
    console.error("Error syncing handles:", err.message);
    res.status(500).json({ error: "Failed to sync and save handles" });
  }
});

// ✅ GET: Live stats (without saving to DB)
router.get("/:id/handles", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const lcStats = user.leetcodeHandle
      ? await fetchLeetCodeStats(user.leetcodeHandle)
      : null;

    const cfStats = user.codeforcesHandle
      ? await fetchCodeforcesStats(user.codeforcesHandle)
      : null;

    res.json({
      leetcode: lcStats,
      codeforces: {
        rating: cfStats?.profile?.rating ?? null,
        maxRating: cfStats?.profile?.maxRating ?? null,
        rank: cfStats?.profile?.rank ?? "unrated",
        solvedCount: cfStats?.profile?.solvedCount ?? 0,
        submissions: cfStats?.submissions || [],
      },
      lastSynced: user.handles?.lastSynced ?? null,
    });
  } catch (err) {
    console.error("Handle stats error:", err.message);
    res.status(500).json({ error: "Failed to fetch handle stats" });
  }
});

// ✅ GET: DSA Tracker Data (dailyStats, streaks)
router.get("/:id/tracker", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("dailyStats currentStreak maxStreak");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      dailyStats: user.dailyStats || [],
      currentStreak: user.currentStreak || 0,
      maxStreak: user.maxStreak || 0,
    });
  } catch (err) {
    console.error("Tracker fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch tracker data" });
  }
});

// GET: AI coach personalized suggestions
router.get("/:id/coach", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Mock AI logic (replace with real ML later)
    const coachData = {
      nextTopic: "Dynamic Programming",
      weakAreas: ["Graphs", "Greedy", "Backtracking"],
      dailyGoal: 2,
      recommendedProblems: [
        {
          title: "Longest Increasing Subsequence",
          difficulty: "Medium",
          link: "https://leetcode.com/problems/longest-increasing-subsequence/",
        },
        {
          title: "Knapsack Problem",
          difficulty: "Medium",
          link: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",
        },
      ],
    };

    res.json(coachData);
  } catch (err) {
    console.error("AI coach error:", err.message);
    res.status(500).json({ error: "Failed to fetch coach data" });
  }
});

// Add in routes/user.js

router.get("/:id/versions", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("versions");

    if (!user) return res.status(404).json({ error: "User not found" });

    // Optional: filter by projectId if needed
    const projectId = req.query.projectId;
    const versions = projectId
      ? user.versions.filter((v) => v.projectId.toString() === projectId)
      : user.versions;

    res.json(versions);
  } catch (err) {
    console.error("Version fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch versions" });
  }
});

module.exports = router;
