import { useState, useEffect } from "react";
import LoadingIcon from "./LoadingIcon";

interface AnswerScreenProps {
  answer: [string, number];
  onTimerEnd: () => void;
}

const AnswerScreen: React.FC<AnswerScreenProps> = ({ answer, onTimerEnd }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      if (secondsRemaining === 0) {
        onTimerEnd();
        clearInterval(intervalId);
      }
    }, 1000);
  });

  return (
    <div className="bg-blue-800 flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-8">The correct answer was:</h1>
      <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 h-32 mt-8">
        <img
          src={`/option${answer[1] + 1}.png`}
          className="w-12 h-12"
          alt={`/option${answer[1] + 1}`}
        />
        <div className="ml-4">
          <p className="text-2xl font-bold text-black">{answer[0]}</p>
        </div>
      </div>
      <LoadingIcon />
    </div>
  );
};

export default AnswerScreen;
