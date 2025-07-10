import { Button } from "@/components/ui/button";
import { Rocket, Brain, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Optional icon

const GitHubIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
    >
        <title>GitHub</title>
        <path d="M12 0C5.373 0 0 5.373 0 12a12.01 12.01 0 0 0 8.208 11.387c.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.206.085 1.84 1.24 1.84 1.24 1.07 1.834 2.807 1.304 3.492.996.108-.776.418-1.305.762-1.604-2.665-.303-5.467-1.332-5.467-5.931 0-1.31.467-2.382 1.235-3.222-.125-.304-.535-1.524.118-3.176 0 0 1.008-.322 3.3 1.23a11.47 11.47 0 0 1 3.003-.404c1.02.005 2.048.138 3.004.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.245 2.872.12 3.176.77.84 1.232 1.912 1.232 3.222 0 4.61-2.807 5.625-5.48 5.921.43.372.814 1.103.814 2.222 0 1.604-.015 2.897-.015 3.292 0 .32.218.694.825.576A12.01 12.01 0 0 0 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
);


const About = () => {
    const navigate = useNavigate();
    return (

        <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 text-gray-800">
            {/* 🔙 Back to Home Button */}
            <button
                onClick={() => navigate("/")}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50 hover:shadow transition duration-200"
            >
                <ArrowLeft size={18} />
                <span className="font-medium">Back to Home</span>
            </button>
            <div className="max-w-5xl mx-auto px-6 py-12">

                {/* 🌟 Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-700 mb-4">
                        🚀 Welcome to <span className="text-indigo-600">AlgoVista</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your all-in-one DSA visualizer, personalized tracker, and AI-powered coding companion — built to accelerate your problem-solving journey.
                    </p>
                </div>

                {/* 🧠 Mission */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-2 text-indigo-700">🎯 Our Mission</h2>
                    <p className="text-gray-700">
                        AlgoVista is designed to make Data Structures and Algorithms intuitive, engaging, and personalized.
                        Whether you're preparing for interviews, solving contests, or building a consistent DSA habit —
                        we’ve got you covered.
                    </p>
                </section>

                {/* 🔍 Key Features */}
                <section className="mb-10 grid gap-6 md:grid-cols-2">
                    <div className="bg-white rounded-xl shadow p-5 border">
                        <h3 className="flex items-center text-lg font-semibold text-blue-600 mb-2">
                            <Code2 className="mr-2" /> Interactive DSA Visualizations
                        </h3>
                        <p className="text-gray-700">
                            Visualize sorting, trees, graphs, recursion, and more with step-by-step animations powered by D3.js.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 border">
                        <h3 className="flex items-center text-lg font-semibold text-green-600 mb-2">
                            <Brain className="mr-2" /> AI Coach
                        </h3>
                        <p className="text-gray-700">
                            Get smart suggestions, weak topic analysis, and personalized daily goals powered by ML logic.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 border">
                        <h3 className="flex items-center text-lg font-semibold text-purple-600 mb-2">
                            <Rocket className="mr-2" /> Practice Tracker
                        </h3>
                        <p className="text-gray-700">
                            Visual heatmaps, streaks, and problem attempts — build habits and monitor your growth.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 border">
                        <h3 className="flex items-center text-lg font-semibold text-pink-600 mb-2">
                            🧾 Version History
                        </h3>
                        <p className="text-gray-700">
                            Save and rewind previous solutions. Compare iterations over time with our version control system.
                        </p>
                    </div>
                </section>

                {/* ⚙️ Tech Stack */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-2 text-indigo-700">⚙️ Tech Stack</h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li><strong>Frontend:</strong> Vite + React + TailwindCSS + D3.js</li>
                        <li><strong>Backend:</strong> Node.js + Express + MongoDB</li>
                        <li><strong>AI/ML:</strong> Custom ML logic (future: integrate LLMs for suggestions)</li>
                        <li><strong>Auth:</strong> JWT + OAuth (GitHub)</li>
                        <li><strong>Code Execution:</strong> Docker-based sandboxed engine</li>
                    </ul>
                </section>

                {/* 🛣️ Roadmap */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-2 text-indigo-700">🛣️ What’s Coming Next?</h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>📈 Competitive Analytics (rating history, rank prediction)</li>
                        <li>🎮 Gamification (XP, badges, leaderboards)</li>
                        <li>📂 Public Projects + Shareable Profiles</li>
                        <li>💬 Collaborative Discussions + Peer Challenges</li>
                    </ul>
                </section>

                {/* 📬 Call to Action */}
                <div className="text-center mt-12">
                    <h2 className="text-xl font-semibold mb-3">Want to contribute or follow development?</h2>
                    <a
                        href="https://github.com/Ayush-Kumar0207/algovista.git"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full shadow-lg">
                            <GitHubIcon />
                            Visit GitHub Repo
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
