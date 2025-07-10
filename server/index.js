const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

const connectDB = require('./config/db');
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ AlgoVista Backend is Live!");
});

// Routes
const recommendRoute = require("./routes/recommend");
app.use("/api/recommend", recommendRoute);

// in server/index.js or server/app.js
const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

const syncRoutes = require("./routes/sync");
app.use("/api/sync", syncRoutes);

const trackerRoutes = require("./routes/tracker");
app.use("/", trackerRoutes);

app.use("/api/auth", require("./routes/auth"));
// app.use("/api/tracker", require("./routes/tracker"));
app.use("/api/ai", require("./routes/ai"));



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
