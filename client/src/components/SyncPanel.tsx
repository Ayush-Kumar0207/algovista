import { useState } from "react";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";

interface Props {
  setLastSynced: (value: string) => void;
}
type SyncResponse = {
  leetcode: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
  codeforces: {
    rating: number;
    maxRating: number;
    rank: string;
    solvedCount: number;
  };
  lastSynced: string;
};


const SyncPanel = ({ setLastSynced }: Props) => {
  const { user } = useAuth();
  const [leetcode, setLeetcode] = useState("");
  const [cf, setCF] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sync = async () => {
    if (!leetcode.trim() || !cf.trim()) {
      toast.error("Please enter both LeetCode and Codeforces handles.");
      return;
    }

    if (!user?._id) {
      toast.error("You must be logged in to sync.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await api.post<SyncResponse>("/sync/all", {
        userId: user._id,
        leetcodeUsername: leetcode,
        codeforcesHandle: cf,
      });

      
      setResult(res.data);
      if (res.data.lastSynced) {
        setLastSynced(res.data.lastSynced);
      }

      toast.success("✅ Synced successfully!");
    } catch (err) {
      console.error("❌ Sync error:", err);
      toast.error("Failed to sync data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-10 max-w-3xl mx-auto border border-gray-200">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">
        🔄 Sync Your DSA Progress
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label
            htmlFor="leetcode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            LeetCode Handle
          </label>
          <input
            id="leetcode"
            type="text"
            placeholder="e.g. john_doe"
            value={leetcode}
            onChange={(e) => setLeetcode(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="codeforces"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Codeforces Handle
          </label>
          <input
            id="codeforces"
            type="text"
            placeholder="e.g. johndoe123"
            value={cf}
            onChange={(e) => setCF(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <Button
        onClick={sync}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md"
      >
        {loading ? "Syncing..." : "Sync Now"}
      </Button>

      {result && (
        <div className="mt-8 space-y-6">
          {/* LeetCode Stats */}
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              ✅ LeetCode Stats
            </h3>
            {result.leetcode ? (
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  Total Solved: <strong>{result.leetcode.total}</strong>
                </li>
                <li>Easy: {result.leetcode.easy}</li>
                <li>Medium: {result.leetcode.medium}</li>
                <li>Hard: {result.leetcode.hard}</li>
              </ul>
            ) : (
              <p className="text-red-500 text-sm">❌ Could not fetch LeetCode stats.</p>
            )}
          </div>

          {/* Codeforces Stats */}
          <div>
            <h3 className="text-lg font-semibold text-purple-700 mb-2">
              ✅ Codeforces Stats
            </h3>
            {result.codeforces ? (
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Rating: <strong>{result.codeforces.rating}</strong></li>
                <li>Max Rating: {result.codeforces.maxRating}</li>
                <li>Rank: {result.codeforces.rank}</li>
                <li>Unique Problems Solved: <strong>{result.codeforces.solvedCount}</strong></li>
              </ul>
            ) : (
              <p className="text-red-500 text-sm">❌ Could not fetch Codeforces stats.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SyncPanel;
