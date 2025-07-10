import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import TrackerDashboard from "./components/dashboard/TrackerDashboard";

import Tracker from "./pages/Tracker";
import Coach from "./pages/Coach";
import Visualizer from "./pages/Visualizer";
import Sorting from "./pages/Sorting"; // Optional: Can be removed if unused
import Versions from "./pages/Versions";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* 🌟 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/versions" element={<Versions />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* 🧑‍💻 User Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/practice" element={<TrackerDashboard />} />
          <Route path="/settings" element={<Settings />} />

          {/* 📊 Unified Visualizer Route */}
          <Route path="/visualizer" element={<Visualizer />} />

          {/* 🧮 Optional: legacy sorting visualizer */}
          <Route path="/visualizer/sort" element={<Sorting />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
