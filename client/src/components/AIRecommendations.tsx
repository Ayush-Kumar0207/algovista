import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Make sure this exists

type Problem = {
  _id: string;
  title: string;
  topic: string;
  difficulty: string;
  status: string;
  link: string;
};

const AIRecommendations = () => {
  const { user } = useAuth(); // get user context
  const [recommendations, setRecommendations] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(`/api/recommend?userId=${user?._id}`);
        console.log("🧠 API Response:", res.data);

        const responseData = res.data as unknown;
        const data = Array.isArray(responseData)
          ? responseData
          : typeof responseData === "object" &&
            responseData !== null &&
            Array.isArray((responseData as any).recommendations)
          ? (responseData as any).recommendations
          : [];

        setRecommendations(data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchRecommendations();
  }, [user]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/problems/${id}/status`, { status });
      setRecommendations((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status } : p))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleFeedback = (id: string, feedback: "like" | "dislike") => {
    console.log(`Feedback on ${id}: ${feedback}`);
    // Optional: POST feedback to /api/recommend/feedback
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">🧠 AI Coach Recommendations</h2>

      {loading ? (
        <p className="text-gray-500">Loading suggestions...</p>
      ) : recommendations.length === 0 ? (
        <p className="text-gray-500 italic">
          No recommendations yet. Solve a few problems to get personalized suggestions.
        </p>
      ) : (
        <table className="w-full table-auto text-left text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th>Topic</th>
              <th>Difficulty</th>
              <th>Status</th>
              <th>Update</th>
              <th>Link</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-2 font-medium text-blue-600">{p.title}</td>
                <td>{p.topic}</td>
                <td>{p.difficulty}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      p.status === "solved"
                        ? "bg-green-100 text-green-700"
                        : p.status === "bookmark"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td>
                  <select
                    value={p.status}
                    onChange={(e) => handleStatusChange(p._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="unsolved">Unsolved</option>
                    <option value="solved">Solved</option>
                    <option value="bookmark">Bookmark</option>
                  </select>
                </td>
                <td>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline"
                  >
                    Visit
                  </a>
                </td>
                <td>
                  <button
                    className="text-green-600 hover:underline mr-2"
                    onClick={() => handleFeedback(p._id, "like")}
                  >
                    👍
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleFeedback(p._id, "dislike")}
                  >
                    👎
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AIRecommendations;
