// routes/sync.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require("../models/user");

// POST /api/sync/all
router.post("/all", async (req, res) => {
    const { userId, leetcodeUsername, codeforcesHandle } = req.body;

    if (!userId || !leetcodeUsername || !codeforcesHandle) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        // --- Fetch LeetCode Data ---
        const leetcodeQuery = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;
        const leetcodeRes = await axios.post(
            "https://leetcode.com/graphql",
            {
                query: leetcodeQuery,
                variables: { username: leetcodeUsername },
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        const acSubmissions =
            leetcodeRes.data?.data?.matchedUser?.submitStats?.acSubmissionNum || [];

        const leetcodeStats = {
            easy: acSubmissions.find((x) => x.difficulty === "Easy")?.count || 0,
            medium: acSubmissions.find((x) => x.difficulty === "Medium")?.count || 0,
            hard: acSubmissions.find((x) => x.difficulty === "Hard")?.count || 0,
        };
        leetcodeStats.total =
            leetcodeStats.easy + leetcodeStats.medium + leetcodeStats.hard;

        // --- Fetch Codeforces Data ---
        const cfInfo = await axios.get(
            `https://codeforces.com/api/user.info?handles=${codeforcesHandle}`
        );
        const cfUser = cfInfo.data.result[0];

        const cfSubmissionsRes = await axios.get(
            `https://codeforces.com/api/user.status?handle=${codeforcesHandle}&from=1&count=10000`
        );
        const allSubs = cfSubmissionsRes.data?.result || [];

        const solvedSet = new Set();
        allSubs.forEach((sub) => {
            if (sub.verdict === "OK" && sub.problem) {
                solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
            }
        });

        const codeforcesStats = {
            rating: cfUser.rating || 0,
            maxRating: cfUser.maxRating || 0,
            rank: cfUser.rank || "unrated",
            solvedCount: solvedSet.size,
            submissions: allSubs,
        };
        const now = new Date();
        // --- Save to DB ---
        await User.findByIdAndUpdate(userId, {
            leetcodeHandle: leetcodeUsername,
            codeforcesHandle: codeforcesHandle,
            handles: {
                leetcode: leetcodeStats,
                codeforces: codeforcesStats,
                lastSynced: now,
            },
        });

        return res.json({ leetcode: leetcodeStats, codeforces: codeforcesStats, lastSynced: now });
    } catch (err) {
        console.error("❌ Sync All Error:", err.message);
        return res.status(500).json({ error: "Failed to sync all platforms." });
    }
});

module.exports = router;
