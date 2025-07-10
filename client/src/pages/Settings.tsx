import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Save, User, Undo2, Link2 } from "lucide-react"; // ✅ Add ArrowLeft


const Settings = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [leetcode, setLeetcode] = useState("");
    const [codeforces, setCodeforces] = useState("");
    const [savedLeetcode, setSavedLeetcode] = useState("");
    const [savedCodeforces, setSavedCodeforces] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            navigate("/login");
            return; // 🔑 THIS return is important
        }

        if (!user._id) {
            setError("User ID is missing. Please re-login.");
            setLoading(false);
            return;
        }

        const fetchHandles = async () => {
            try {
                const res = await api.get(`/user/${user._id}`);
                const data = res.data as {
                    leetcodeHandle?: string;
                    codeforcesHandle?: string;
                };
                setLeetcode(data.leetcodeHandle || "");
                setSavedLeetcode(data.leetcodeHandle || "");
                setCodeforces(data.codeforcesHandle || "");
                setSavedCodeforces(data.codeforcesHandle || "");
            } catch (err) {
                console.error("❌ Failed to fetch handles", err);
                setError("Failed to load your handles.");
            } finally {
                setLoading(false);
            }
        };

        fetchHandles();
    }, [user, authLoading, navigate]);

    const handleUpdate = async () => {
        if (!user || !user._id) {
            setError("User not found. Please login again.");
            return;
        }

        try {
            await api.put(`/user/${user._id}`, {
                leetcodeHandle: leetcode.trim(),
                codeforcesHandle: codeforces.trim(),
            });

            setMessage("✅ Handles updated successfully!");
            setError("");
        } catch (err) {
            console.error("❌ Update failed", err);
            setError("Failed to update handles.");
            setMessage("");
        }
    };

    const isChanged =
        leetcode.trim() !== savedLeetcode || codeforces.trim() !== savedCodeforces;

    if (authLoading || loading || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
                <Loader2 className="animate-spin mr-2" />
                Loading settings...
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* 🔙 Back to Home Button */}
            <button
                onClick={() => navigate("/")}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50 hover:shadow transition duration-200"
            >
                <ArrowLeft size={18} />
                <span className="font-medium">Back to Home</span>
            </button>

            <div className="bg-white rounded-xl shadow-md p-6 border">
                <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2 mb-6">
                    <User size={24} /> Profile Settings
                </h2>

                {/* User Info */}
                <div className="mb-6 flex items-center gap-4">
                    <img
                        src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${user.username}`}
                        alt="avatar"
                        className="w-14 h-14 rounded-full border shadow"
                    />
                    <div>
                        <p className="text-lg font-semibold">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>

                {/* Message Blocks */}
                {error && <p className="mb-3 text-red-600 font-medium">{error}</p>}
                {message && <p className="mb-3 text-green-600 font-medium">{message}</p>}

                {/* Handles Input */}
                <div className="space-y-4">
                    {/* LeetCode */}
                    <div>
                        <label htmlFor="leetcode" className="font-medium block mb-1">
                            🟧 LeetCode Handle
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                id="leetcode"
                                value={leetcode}
                                onChange={(e) => setLeetcode(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-blue-500"
                                placeholder="e.g., ayush123"
                            />
                            {leetcode && (
                                <a
                                    href={`https://leetcode.com/${leetcode}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                    title="Open profile"
                                >
                                    <Link2 size={18} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Codeforces */}
                    <div>
                        <label htmlFor="codeforces" className="font-medium block mb-1">
                            🟦 Codeforces Handle
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                id="codeforces"
                                value={codeforces}
                                onChange={(e) => setCodeforces(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-blue-500"
                                placeholder="e.g., ayush_cf"
                            />
                            {codeforces && (
                                <a
                                    href={`https://codeforces.com/profile/${codeforces}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                    title="Open profile"
                                >
                                    <Link2 size={18} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                    <button
                        onClick={handleUpdate}
                        disabled={!isChanged}
                        className={`flex items-center gap-2 px-4 py-2 rounded text-white transition ${isChanged
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        <Save size={16} /> Save Changes
                    </button>
                    <button
                        onClick={() => {
                            setLeetcode(savedLeetcode);
                            setCodeforces(savedCodeforces);
                            setMessage("");
                            setError("");
                        }}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 text-gray-800"
                    >
                        <Undo2 size={16} /> Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
