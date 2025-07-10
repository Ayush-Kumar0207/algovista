const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET /user/:id/tracker → returns daily stats
router.get("/user/:id/tracker", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Suppose user has user.dailyStats = [{ date, solved }]
    res.json({ dailyStats: user.dailyStats || [] });
  } catch (err) {
    console.error("Tracker route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
