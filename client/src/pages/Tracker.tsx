import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../utils/api";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import Calendar from "../components/CalendarHeatmap";
import { Flame, Trophy } from "lucide-react";

// ✅ Define the expected response shape
interface DailyStat {
  date: string;
  solved: number;
}

interface TrackerResponse {
  dailyStats: DailyStat[];
  currentStreak: number;
  maxStreak: number;
}

const Tracker = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [dailyData, setDailyData] = useState<DailyStat[]>([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchTrackerStats = async () => {
      try {
        const res = await api.get<TrackerResponse>(`/user/${user._id}/tracker`);
        const { dailyStats, currentStreak, maxStreak } = res.data;
        setDailyData(dailyStats || []);
        setStreak(currentStreak);
        setMaxStreak(maxStreak);
      } catch (err) {
        toast.error("Failed to load tracker data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackerStats();
  }, [user, authLoading, navigate]);

  if (loading || !user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Loading your progress tracker...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">📈 Practice Tracker</h1>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
          </Button>
        </div>

        {/* Streaks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-2 gap-6"
        >
          <div className="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-sm">
            <div className="flex items-center gap-3">
              <Flame className="text-green-600" />
              <div>
                <h3 className="font-bold text-lg text-green-700">🔥 Current Streak</h3>
                <p className="text-gray-700 text-sm">{streak} day(s)</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border-l-4 border-purple-500 shadow-sm">
            <div className="flex items-center gap-3">
              <Trophy className="text-purple-600" />
              <div>
                <h3 className="font-bold text-lg text-purple-700">🏆 Max Streak</h3>
                <p className="text-gray-700 text-sm">{maxStreak} day(s)</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Graph */}
        <div className="bg-white rounded-xl p-6 shadow-sm border mt-4">
          <h2 className="text-lg font-bold text-indigo-700 mb-3">
            📊 Problems Solved (Last 14 Days)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="colorSolve" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="solved"
                stroke="#4f46e5"
                fillOpacity={1}
                fill="url(#colorSolve)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Heatmap */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-bold text-indigo-700 mb-3">📅 Calendar Heatmap</h2>
          <Calendar data={dailyData} />
        </div>

        {/* Quote */}
        <div className="mt-8 bg-indigo-100 rounded-lg p-4 text-center">
          <p className="text-indigo-700 font-medium italic">
            "Consistency beats intensity. Solve just one problem every day!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
