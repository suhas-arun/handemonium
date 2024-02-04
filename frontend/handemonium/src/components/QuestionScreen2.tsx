import React, { useState, useEffect } from "react";
import Timer from "./Timer";

interface QuestionScreen2Props {
  questionIndex: number;
  questionText: string;
  options: { text: string; isCorrect: boolean }[];
  onTimerEnd: () => void;
}

const QuestionScreen2: React.FC<QuestionScreen2Props> = ({
  questionIndex,
  questionText,
  options,
  onTimerEnd,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      if (secondsRemaining === 0) {
        onTimerEnd();
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsRemaining, onTimerEnd]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-blue-800">
      <div className="flex items-center justify-center py-4 px-6 bg-blue-800 border-b border-gray-200">
        <h1 className="text-4xl mt-4 font-semibold">
          {questionIndex + 1}. {questionText}
        </h1>
      </div>
      <Timer countdown={secondsRemaining} />
      <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
        {options.map((option, index) => (
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 h-32">
            <img src={`/option${index + 1}.png`} className="w-12 h-12" alt={`/option${index + 1}`} />
            <div className="ml-4">
              <p className="text-2xl font-bold text-black">{option.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionScreen2;
