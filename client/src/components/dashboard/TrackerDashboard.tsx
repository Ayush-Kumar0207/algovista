import { useEffect, useState } from "react";
import { fetchProblems } from "../../services/problemService";
import ProblemTable from "./ProblemTable";
import ProblemStats from "./ProblemStats";
import DailyGoal from "./DailyGoal";

type Problem = {
    _id: string;
    id: number;
    title: string;
    difficulty: string;
    status: string; // Added to match ProblemStats' Problem type
    link: string;
    topic: string;
    // ...other fields as needed
};

const TrackerDashboard = () => {
    const [problems, setProblems] = useState<Problem[]>([]);

    const loadProblems = async () => {
        const res = await fetchProblems();
        setProblems(res.data as Problem[]);
    };

    useEffect(() => {
        loadProblems();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">📈 Practice Tracker</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <ProblemStats problems={problems} />
                <DailyGoal />
            </div>

            <ProblemTable problems={problems} refresh={loadProblems} />
        </div>
    );
};

export default TrackerDashboard;
