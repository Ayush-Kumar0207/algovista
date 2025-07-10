import { ShieldCheck, FileText, Lock } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Optional icon

const Privacy = () => {
    useEffect(() => {
        document.title = "Privacy Policy | AlgoVista";
    }, []);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-6 text-gray-800">
            {/* 🔙 Back to Home Button */}
            <button
                onClick={() => navigate("/")}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50 hover:shadow transition duration-200"
            >
                <ArrowLeft size={18} />
                <span className="font-medium">Back to Home</span>
            </button>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-6 text-blue-700">
                    <ShieldCheck size={28} />
                    <h1 className="text-3xl font-bold">Privacy Policy</h1>
                </div>

                <p className="mb-4 text-sm text-gray-600">
                    Last updated: <strong>{new Date().toLocaleDateString()}</strong>
                </p>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        <FileText size={20} /> What We Collect
                    </h2>
                    <p className="text-gray-700">
                        We collect only essential information required for authentication, personalized recommendations, and tracking your DSA progress. This includes:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Email address and username</li>
                        <li>LeetCode and Codeforces handles</li>
                        <li>Your solved problems and progress metrics</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        <Lock size={20} /> How We Protect Your Data
                    </h2>
                    <p className="text-gray-700">
                        All user data is securely stored and never shared with any third parties. Passwords are encrypted using industry-standard hashing algorithms. Only you can access and update your personal information.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        🔍 Analytics & Tracking
                    </h2>
                    <p className="text-gray-700">
                        We use anonymous internal analytics to track app usage and improve user experience. No third-party trackers are used. You are never tracked across websites.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        🧠 AI Coach Data
                    </h2>
                    <p className="text-gray-700">
                        If you choose to enable the AI Coach, your problem-solving history is used to generate personalized suggestions. This data is used locally within the app and is not shared externally.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        ⚙️ Your Control
                    </h2>
                    <p className="text-gray-700">
                        You can update or delete your account at any time from the settings page. Upon deletion, all associated data will be permanently removed from our servers.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">📫 Contact Us</h2>
                    <p className="text-gray-700">
                        If you have questions or concerns about your privacy, reach out at{" "}
                        <a
                            href="mailto:support@algovista.io"
                            className="text-blue-600 underline"
                        >
                            support@algovista.io
                        </a>
                        .
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
