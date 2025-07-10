import { updateProblemStatus } from "../../services/problemService";

type Problem = {
  _id: string;
  title: string;
  link: string;
  topic: string;
  difficulty: string;
  status: string;
};

interface ProblemTableProps {
  problems: Problem[] | undefined | null;
  refresh: () => void;
}

const ProblemTable: React.FC<ProblemTableProps> = ({ problems, refresh }) => {
  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateProblemStatus(id, status);
      refresh();
    } catch (error) {
      console.error("Failed to update problem status", error);
    }
  };

  const safeProblems = Array.isArray(problems) ? problems : [];

  return (
    <div className="bg-white shadow rounded overflow-x-auto">
      <table className="w-full table-auto text-left">
        <thead className="bg-gray-100 text-sm text-gray-600">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th>Topic</th>
            <th>Difficulty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {safeProblems.length > 0 ? (
            safeProblems.map((p) => (
              <tr key={p._id} className="border-b">
                <td className="px-4 py-2 text-blue-700">
                  <a href={p.link} target="_blank" rel="noreferrer">
                    {p.title}
                  </a>
                </td>
                <td>{p.topic}</td>
                <td>{p.difficulty}</td>
                <td>{p.status}</td>
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-4">
                No problems to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemTable;
