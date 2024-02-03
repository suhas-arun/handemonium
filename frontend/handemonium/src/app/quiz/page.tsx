"use client";
import React, { useState, useEffect } from "react";
import QuestionScreen1 from "../../components/QuestionScreen1";
import { questions } from "@/questions";

interface QuizPageProps {}

interface QuizPageState {
  currentScreen: "question1" | "question2" | "answer" | "leaderboard" | "final";
  questionIndex: number;
}

const QuizPage: React.FC<QuizPageProps> = () => {
  const [currentScreen, setCurrentScreen] = useState<
    "question1" | "question2" | "answer" | "leaderboard" | "final"
  >("question1");
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const goToQuestionScreen2 = () => {
    console.log("DONE");
    setCurrentScreen("question2");
  };

  // const goToAnswer = () => {
  //   setCurrentScreen("answer");
  // };

  // const goToLeaderboard = () => {
  //   if (questionIndex === questions.length - 1) {
  //     setCurrentScreen("final");
  //   } else {
  //     setCurrentScreen("leaderboard");
  //   }
  // };

  // const handleAnswerSubmit = (answer: string) => {
  //   setQuestionIndex((prevIndex) => prevIndex + 1);
  //   setCurrentScreen("question1");
  // };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentScreen === "question1" && (
        <QuestionScreen1
          questionIndex={questionIndex}
          questionText={questions[questionIndex].question}
          onTimerEnd={goToQuestionScreen2}
        />
      )}
      {/* {currentScreen === "answer" && (
        <QuestionScreen2
          question={questions[questionIndex]}
          onSubmit={handleAnswerSubmit}
        />
      )} */}
    </div>
  );
};

export default QuizPage;
