import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import { Sparkles, Brain, ListTodo, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CoachResponse {
  nextTopic: string;
  weakAreas: string[];
  recommendedProblems: {
    title: string;
    difficulty: string;
    link: string;
  }[];
  dailyGoal: number;
}

const Coach = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [coachData, setCoachData] = useState<CoachResponse | null>(null);
  const [goalCompleted, setGoalCompleted] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchCoachData = async () => {
      try {
        const res = await api.get<CoachResponse>(`/user/${user._id}/coach`);
        setCoachData(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch coach recommendations");
      }
    };

    fetchCoachData();
  }, [user, loading, navigate]);

  if (!coachData) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Loading AI Coach...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-orange-700">🧠 AI Coach</h1>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
          </Button>
        </div>

        {/* Next Topic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-6 border-l-4 border-orange-500 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Brain className="text-orange-600" />
            <div>
              <h3 className="text-lg font-bold text-orange-700">📚 Next Topic</h3>
              <p className="text-gray-700">{coachData.nextTopic}</p>
            </div>
          </div>
        </motion.div>

        {/* Weak Areas */}
        <div className="bg-white p-6 rounded-xl border-l-4 border-rose-500 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="text-rose-600" />
            <h3 className="text-lg font-bold text-rose-700">❗ Weak Areas</h3>
          </div>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {coachData.weakAreas.map((area, i) => (
              <li key={i}>{area}</li>
            ))}
          </ul>
        </div>

        {/* Daily Goal */}
        <div className="bg-white p-6 rounded-xl border-l-4 border-blue-500 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-blue-600" />
              <div>
                <h3 className="text-lg font-bold text-blue-700">🎯 Daily Goal</h3>
                <p className="text-gray-700">{coachData.dailyGoal} problem(s)</p>
              </div>
            </div>
            <Button
              variant={goalCompleted ? "default" : "secondary"}
              onClick={() => {
                setGoalCompleted(true);
                toast.success("Great! Keep it up 💪");
              }}
              disabled={goalCompleted}
            >
              {goalCompleted ? "Completed" : "Mark as Done"}
            </Button>
          </div>
        </div>

        {/* Recommended Problems */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <ListTodo className="text-indigo-600" />
            <h3 className="text-lg font-bold text-indigo-700">🧩 Recommended Problems</h3>
          </div>
          <ul className="space-y-3">
            {coachData.recommendedProblems.map((prob, i) => (
              <li key={i} className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">{prob.title}</span>
                  <span className="text-xs text-gray-500">{prob.difficulty}</span>
                </div>
                <a
                  href={prob.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Solve →
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Motivation */}
        <div className="text-center mt-8 italic text-orange-700 font-medium">
          "Small steps daily lead to giant leaps eventually!"
        </div>
      </div>
    </div>
  );
};

export default Coach;
