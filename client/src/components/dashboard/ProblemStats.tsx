type Problem = {
  status: string;
};

type ProblemStatsProps = {
  problems?: Problem[]; // accept undefined
};

const ProblemStats = ({ problems }: ProblemStatsProps) => {
  const safeProblems = Array.isArray(problems) ? problems : [];

  console.log("ProblemStats received:", problems);

  const total = safeProblems.length;
  const solved = safeProblems.filter((p) => p.status === "solved").length;
  const bookmarked = safeProblems.filter((p) => p.status === "bookmark").length;

  return (
    <div className="bg-white p-6 rounded shadow col-span-2 grid grid-cols-3 gap-4">
      <StatCard label="Total" value={total} color="gray" />
      <StatCard label="Solved" value={solved} color="green" />
      <StatCard label="Bookmarked" value={bookmarked} color="blue" />
    </div>
  );
};

type StatCardProps = {
  label: string;
  value: number;
  color: string;
};

const StatCard = ({ label, value, color }: StatCardProps) => (
  <div className={`bg-${color}-100 text-${color}-800 p-4 rounded text-center`}>
    <div className="text-lg font-semibold">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export default ProblemStats;
