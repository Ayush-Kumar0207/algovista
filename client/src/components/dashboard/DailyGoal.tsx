const DailyGoal = () => {
  return (
    <div className="bg-white p-4 rounded shadow h-full flex flex-col justify-between">
      <h2 className="text-lg font-bold mb-2 text-blue-600">🎯 Daily Goal</h2>
      <p className="text-gray-600 text-sm mb-4">Solve 2 problems today</p>
      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
        Get Problem
      </button>
    </div>
  );
};

export default DailyGoal;
