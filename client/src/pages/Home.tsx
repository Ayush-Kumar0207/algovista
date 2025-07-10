import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext"; // ✅ Adjust path if needed
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";


const features = [
  {
    title: "📊 Dashboard",
    desc: "Sync LeetCode & Codeforces stats and track progress at a glance.",
    link: "/dashboard",
  },
  {
    title: "🎯 Practice Tracker",
    desc: "Monitor your daily streaks and topic-wise completion effortlessly.",
    link: "/tracker",
  },
  {
    title: "🧠 AI Coach",
    desc: "Get personalized problem recommendations based on your weaknesses.",
    link: "/coach",
  },
  {
    title: "📈 DSA Visualizer",
    desc: "Visualize sorting, trees, graphs, and recursion with live D3.js graphs.",
    link: "/visualizer",
  },
  {
    title: "🛠️ Settings",
    desc: "Easily update handles and customize your preferences anytime.",
    link: "/settings",
  },
  {
    title: "🗃️ Version Control",
    desc: "View historical solutions and practice attempts over time.",
    link: "/versions",
  },
];

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   const confirmed = window.confirm("Are you sure you want to logout?");
  //   if (!confirmed) return;

  //   logout();
  //   toast.success("Logged out successfully.");
  //   navigate("/login");
  // };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {user && (
        <div className="absolute top-4 right-4 z-50">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="px-6 py-2 text-sm font-semibold shadow-lg hover:bg-red-600 transition rounded-lg"
              >
                Logout
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-sm">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-lg">
                  Are you sure you want to logout?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-gray-600">
                  This will end your current session and take you back to the login screen.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-md">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 text-white hover:bg-red-600 rounded-md"
                  onClick={() => {
                    logout();
                    toast.success("Logged out successfully");
                    navigate("/login");
                  }}
                >
                  Yes, Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-blue-800 via-sky-700 to-cyan-600 text-white py-24 px-6 text-center shadow-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-lg">
            Welcome to <span className="text-yellow-300">AlgoVista</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 mb-8">
            A powerful, all-in-one platform to visualize, practice, and master DSA — faster, smarter, and with AI.
          </p>

          <div className="flex justify-center flex-wrap gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-white text-blue-800 font-semibold shadow hover:bg-gray-100 transition">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button className="bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-300 transition">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="bg-white text-blue-700 border border-blue-700 hover:bg-blue-100 hover:text-blue-900 font-semibold transition">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </header>

      {/* Features */}
      <section className="bg-white py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
          🚀 Supercharge Your Prep with These Features
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.025 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all group"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {feature.desc}
              </p>
              <Link
                to={feature.link}
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                Explore →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Teaser */}
      <section className="bg-gradient-to-r from-gray-100 via-white to-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            📈 Trusted by 500+ Learners & Coders
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're preparing for FAANG or just starting out — AlgoVista's AI, insights, and visual tools help
            you stay consistent and confident.
          </p>
          <Link to={user ? "/dashboard" : "/signup"}>
            <Button className="bg-blue-700 hover:bg-blue-800 text-white shadow">
              {user ? "Open Dashboard" : "Join Now"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-white/70">
            © {new Date().getFullYear()} AlgoVista. Crafted with 💙 by Ayush Kumar.
          </p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:underline text-white/80">
              About
            </Link>
            <Link to="/privacy" className="hover:underline text-white/80">
              Privacy
            </Link>
            <Link to="/contact" className="hover:underline text-white/80">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;