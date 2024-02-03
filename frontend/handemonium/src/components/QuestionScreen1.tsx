import React, { useState, useEffect } from "react";

interface QuestionPageProps {
  questionIndex: number;
  questionText: string;
  onTimerEnd: () => void;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ questionIndex, questionText, onTimerEnd }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="bg-red-500 flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-8">Question {questionIndex + 1}</h1>
      <p className="text-4xl text-white mb-8">{questionText}</p>
      <div className="text-6xl font-bold">{countdown}</div>
    </div>
  );
};

export default QuestionPage;
