const axios = require("axios");

// ✅ LeetCode Stats Fetcher
const fetchLeetCodeStats = async (username) => {
  try {
    const res = await axios.post(
      "https://leetcode.com/graphql",
      {
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `,
        variables: { username },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: `https://leetcode.com/${username}/`,
        },
      }
    );

    const user = res.data.data.matchedUser;
    if (!user) return null;

    const ac = user.submitStats.acSubmissionNum;

    return {
      totalSolved: ac.reduce((sum, cur) => sum + cur.count, 0),
      easy: ac.find((d) => d.difficulty === "Easy")?.count || 0,
      medium: ac.find((d) => d.difficulty === "Medium")?.count || 0,
      hard: ac.find((d) => d.difficulty === "Hard")?.count || 0,
    };
  } catch (err) {
    console.error("❌ LeetCode fetch error:", err.message);
    return null;
  }
};

// ✅ Codeforces Stats Fetcher (Updated to include solvedCount and profile)
const fetchCodeforcesStats = async (handle) => {
  try {
    const [infoRes, subRes] = await Promise.all([
      axios.get(`https://codeforces.com/api/user.info?handles=${handle}`),
      axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`)
    ]);

    const submissions = subRes.data.status === "OK" ? subRes.data.result : [];

    let user = null;
    if (infoRes.data.status === "OK" && infoRes.data.result?.length) {
      user = infoRes.data.result[0];
    } else {
      console.warn("⚠️ Codeforces user.info failed:", infoRes.data.comment || "Unknown reason");
    }

    // Calculate unique solved problems
    const solvedSet = new Set();
    submissions.forEach((sub) => {
      if (sub.verdict === "OK" && sub.problem) {
        solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    });

    return {
      profile: {
        rating: user?.rating ?? null,
        maxRating: user?.maxRating ?? null,
        rank: user?.rank ?? null,
        solvedCount: solvedSet.size,
      },
      submissions,
    };
  } catch (err) {
    console.error("❌ Codeforces fetch error:", err.message);
    return {
      profile: {
        rating: null,
        maxRating: null,
        rank: null,
        solvedCount: 0,
      },
      submissions: [],
    };
  }
};

module.exports = {
  fetchLeetCodeStats,
  fetchCodeforcesStats,
};
