import React, { useEffect, useState } from "react";

interface LeaderboardProps {
  leaderboard: { name: string; score: number }[];
  onTimerEnd: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  leaderboard,
  onTimerEnd,
}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          onTimerEnd();
          clearInterval(timer);
        }
        return prevCountdown - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="bg-blue-800 flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-8">Current Leaderboard</h1>
      <div className="flex flex-col items-center mb-8">
        {leaderboard.map(([name, score], index) => (
          <div
            key={index}
            className="flex items-center p-4 w-48 h-16 justify-between bg-white rounded-lg shadow-md hover:bg-gray-100 mt-4"
          >
            <p className="text-2xl font-bold text-black justify-left">
              {index + 1}. {name}
            </p>
            <div className="rounded-full h-10 w-10 bg-blue-500 flex items-center justify-center text-white">
              <span className="text-xl font-semibold">{score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
