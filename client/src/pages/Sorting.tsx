import SortingVisualizer from "../components/visualizers/SortingVisualizer";
const Sorting = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <SortingVisualizer algorithm="bubble" speed={500} />
    </div>
  );
};

export default Sorting;
