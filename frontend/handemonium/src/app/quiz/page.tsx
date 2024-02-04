"use client";
import React, { useState } from "react";
import QuestionScreen1 from "../../components/QuestionScreen1";
import QuestionScreen2 from "@/components/QuestionScreen2";
import { getCorrectAnswer, questions } from "@/questions";
import AnswerScreen from "@/components/AnswerScreen";
import Leaderboard from "@/components/Leaderboard";
import FinalScreen from "@/components/FinalScreen";
import GameState from "../../GameState";

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
  const [gameState, setGameState] = useState(new GameState());

  const goToQuestionScreen2 = () => {
    setCurrentScreen("question2");
  };

  const goToAnswer = () => {
    setCurrentScreen("answer");
  };

  const goToLeaderboard = () => {
    if (questionIndex === questions.length - 1) {
      setCurrentScreen("final");
    } else {
      setCurrentScreen("leaderboard");
    }
  };

  function nextQuestion() {
    const newQuestionIndex = questionIndex + 1;
    setQuestionIndex(newQuestionIndex);
    setCurrentScreen("question1");
  }

  return (
    <div className="min-h-screen bg-blue-800">
      {currentScreen === "question1" && (
        <QuestionScreen1
          questionIndex={questionIndex}
          questionText={questions[questionIndex].question}
          onTimerEnd={goToQuestionScreen2}
        />
      )}
      {currentScreen === "question2" && (
        <QuestionScreen2
          questionIndex={questionIndex}
          questionText={questions[questionIndex].question}
          options={questions[questionIndex].options}
          onTimerEnd={goToAnswer}
        />
      )}
      {currentScreen === "answer" && (
        <AnswerScreen
          answer={getCorrectAnswer(questions[questionIndex])!}
          onTimerEnd={goToLeaderboard}
          gameState={gameState}
        />
      )}
      {currentScreen === "leaderboard" && (
        <Leaderboard
          leaderboard={gameState.getLeaderboard()}
          onTimerEnd={nextQuestion}
        />
      )}
      {currentScreen === "final" && (
        <FinalScreen leaderboard={gameState.getLeaderboard()} />
      )}
    </div>
  );
};

export default QuizPage;
