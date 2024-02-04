import React, { useState, useEffect } from "react";
import Timer from "./Timer";

interface QuestionScreen1Props {
  questionIndex: number;
  questionText: string;
  onTimerEnd: () => void;
}

const QuestionScreen1: React.FC<QuestionScreen1Props> = ({
  questionIndex,
  questionText,
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
  });

  return (
    <div className="bg-blue-800 flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-8">Question {questionIndex + 1}</h1>
      <p className="text-4xl text-white mb-8">{questionText}</p>
      <Timer countdown={countdown} />
    </div>
  );
};

export default QuestionScreen1;
