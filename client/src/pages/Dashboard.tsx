import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AIRecommendations from "../components/AIRecommendations";
import SyncPanel from "../components/SyncPanel";
import QuickPlatformStats from "../components/QuickPlatformStats";
import api from "../utils/api";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

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

const Dashboard = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [totalSolved, setTotalSolved] = useState<number | null>(null);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchStats = async () => {
      try {
        type HandlesResponse = {
          leetcode?: { easy?: number; medium?: number; hard?: number };
          codeforces?: { submissions?: any[] };
          lastSynced?: string;
          dailyStats?: { date: string; solved: number }[];
          currentStreak?: number;
          maxStreak?: number;
        };

        const res = await api.get<HandlesResponse>(`/user/${user._id}/handles`);
        const { leetcode, codeforces, lastSynced, dailyStats } = res.data;

        // ✅ Calculate total solved
        const leetTotal =
          (leetcode?.easy || 0) + (leetcode?.medium || 0) + (leetcode?.hard || 0);

        const solvedSet = new Set();
        (codeforces?.submissions || []).forEach((sub: any) => {
          if (sub.verdict === "OK" && sub.problem) {
            solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
          }
        });

        setTotalSolved(leetTotal + solvedSet.size);
        if (lastSynced) setLastSynced(lastSynced);

        // ✅ Calculate current streak
        if (dailyStats && dailyStats.length > 0) {
          const today = new Date().toISOString().split("T")[0];
          const todayEntry = dailyStats.find((entry) => entry.date === today);

          let streak = 0;
          if (todayEntry && todayEntry.solved > 0) {
            streak = 1;
            let prevDate = new Date(today);

            while (true) {
              prevDate.setDate(prevDate.getDate() - 1);
              const prevStr = prevDate.toISOString().split("T")[0];
              const prevEntry = dailyStats.find((entry) => entry.date === prevStr);
              if (prevEntry && prevEntry.solved > 0) {
                streak++;
              } else {
                break;
              }
            }
          }

          setCurrentStreak(streak);
        }

      } catch (err) {
        console.error("Error fetching solved stats:", err);
        setTotalSolved(null);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [user, authLoading, navigate]);

  // const handleLogout = () => {
  //   if (window.confirm("Are you sure you want to logout?")) {
  //     logout();
  //     toast.success("Logged out successfully");
  //     navigate("/login");
  //   }
  // };

  if (authLoading || !user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600 text-sm">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md rounded-2xl px-6 py-8"
        >
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-1">
            Welcome back, {user.username}! 👋
          </h1>
          <p className="text-sm text-gray-600">
            Your personalized DSA dashboard is ready.
          </p>

          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white border-l-4 border-green-500 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-lg font-bold text-green-700">✅ Problems Solved</h3>
            <p className="text-sm mt-1 text-gray-700">
              {loadingStats
                ? "Loading..."
                : totalSolved !== null
                  ? `${totalSolved} problems solved`
                  : "No data available"}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white border-l-4 border-blue-500 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-lg font-bold text-blue-700">🔥 Current Streak</h3>
            <p className="text-sm mt-1 text-gray-700">
              {currentStreak > 0
                ? `${currentStreak} day${currentStreak > 1 ? "s" : ""} of consistent practice`
                : "No streak — start today!"}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white border-l-4 border-purple-500 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-lg font-bold text-purple-700">📅 Last Synced</h3>
            <p className="text-sm mt-1 text-gray-700">
              {lastSynced
                ? new Date(lastSynced).toLocaleString()
                : "Not synced yet"}
            </p>
          </motion.div>
        </div>

        {/* AI Coach */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AIRecommendations />
        </motion.div>

        {/* Sync Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SyncPanel setLastSynced={setLastSynced} />
        </motion.div>

        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <QuickPlatformStats />
        </motion.div>

        {/* Logout Button */}
        
        <div className="text-right mt-10">
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
      </div>
    </div>
  );
};

export default Dashboard;
