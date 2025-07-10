const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // 🧑 Basic Auth Info
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // ✅ Topic-wise DSA Progress (Local Tracking)
    progress: {
      graphs: { type: Number, default: 0 },
      dp: { type: Number, default: 0 },
      trees: { type: Number, default: 0 },
      sorting: { type: Number, default: 0 },
    },

    // 🌐 External Handles
    leetcodeHandle: { type: String, default: "" },
    codeforcesHandle: { type: String, default: "" },

    // 📊 Synced Platform Stats
    handles: {
      leetcode: {
        easy: { type: Number, default: 0 },
        medium: { type: Number, default: 0 },
        hard: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
      },
      codeforces: {
        rating: { type: Number, default: 0 },
        maxRating: { type: Number, default: 0 },
        rank: { type: String, default: "unrated" },
        solvedCount: { type: Number, default: 0 },
        submissions: { type: Array, default: [] },
      },
      lastSynced: { type: Date },
    },

    // 📅 Heatmap Data (Daily Solves)
    dailyStats: [
      {
        date: { type: String, required: true }, // e.g., "2025-07-06"
        solved: { type: Number, default: 0 },
      },
    ],

    // 🔥 Streak Tracking
    currentStreak: { type: Number, default: 0 },
    maxStreak: { type: Number, default: 0 },

    // 🧠 AI Coach Metadata (optional future use)
    coachPreferences: {
      focusArea: { type: String, default: "" },
      goalPerDay: { type: Number, default: 2 },
      lastAdvised: { type: Date },
    },
    // 📦 Version Control: Saved Snapshots
    versions: [
      {
        label: { type: String, default: "" }, // e.g., "First Try", "Optimized"
        projectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
          required: true,
        },
        files: {
          type: Object, // e.g., { "main.py": "...", "utils.js": "..." }
          required: true,
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Export model
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
