import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useAuth } from "../context/AuthContext";

const QuickPlatformStats = () => {
    const { user } = useAuth();
    const [leetcodeStats, setLeetcodeStats] = useState<any>(null);
    const [codeforcesStats, setCodeforcesStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user._id) return;

        const fetchStats = async () => {
            try {
                const res = await api.get(`/user/${user._id}/handles`);
                console.log("📊 Stats response:", res.data);

                const data = res.data as { leetcode?: any; codeforces?: any };
                if (data.leetcode) setLeetcodeStats(data.leetcode);
                if (data.codeforces) setCodeforcesStats(data.codeforces);
            } catch (err) {
                console.error("Error fetching platform stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user]);

    if (!user || !user._id) return <p className="text-red-500">❌ User not logged in.</p>;

    if (loading) return <p className="text-gray-500">Loading stats...</p>;

    return (
        <div className="bg-white p-6 mt-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">🌐 Platform Stats</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="border p-4 rounded-lg bg-gray-50">
                    <h3 className="text-blue-700 font-semibold mb-2">✅ LeetCode Stats</h3>
                    {leetcodeStats ? (
                        <>
                            <p>Total Solved: {leetcodeStats.easy + leetcodeStats.medium + leetcodeStats.hard}</p>
                            <p>Easy: {leetcodeStats.easy}</p>
                            <p>Medium: {leetcodeStats.medium}</p>
                            <p>Hard: {leetcodeStats.hard}</p>
                        </>
                    ) : (
                        <p className="text-gray-500 italic">Not available</p>
                    )}
                </div>

                <div className="border p-4 rounded-lg bg-gray-50">
                    <h3 className="text-purple-700 font-semibold mb-2">✅ Codeforces Stats</h3>
                    {codeforcesStats ? (
                        <>
                            <p>Rating: {codeforcesStats.rating ?? "N/A"}</p>
                            <p>Max Rating: {codeforcesStats.maxRating ?? "N/A"}</p>
                            <p>Rank: {codeforcesStats.rank ?? "unrated"}</p>
                            <p>Total Solved: {codeforcesStats.solvedCount ?? 0}</p>
                        </>
                    ) : (
                        <p className="text-gray-500 italic">Not available</p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default QuickPlatformStats;
