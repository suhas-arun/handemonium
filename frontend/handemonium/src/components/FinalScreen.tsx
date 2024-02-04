import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

interface FinalScreenProps {
  leaderboard: { name: string; score: number }[];
}

const FinalScreen: React.FC<FinalScreenProps> = ({ leaderboard }) => {
  return (
    <div className="bg-blue-800 flex flex-col items-center justify-center h-screen">
      <button
        className="absolute top-8 left-8 bg-blue-500 hover:bg-gray-200 hover:text-black text-white font-bold py-2 px-4 rounded justify-left"
        onClick={() => (window.location.href = "/")}
      >
        <FontAwesomeIcon icon={faHome} />
      </button>
      <div className="bg-blue-800 flex justify-between items-center">
        <h1 className="text-6xl font-bold mb-8">Final Leaderboard</h1>
      </div>
      <div className="flex flex-col items-center mb-8">
        {leaderboard.slice(0, 3).map((entry, index) => (
          <div
            key={index}
            className="flex items-center p-4 w-48 h-20 justify-between bg-white rounded-lg shadow-md hover:bg-gray-100 mt-4"
          >
            <p className="text-2xl font-bold text-black justify-left">
              {index + 1}. {entry.name}
            </p>
            <div className="rounded-full h-10 w-10 bg-blue-500 flex items-center justify-center text-white">
              <span className="text-xl font-semibold">{entry.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinalScreen;
