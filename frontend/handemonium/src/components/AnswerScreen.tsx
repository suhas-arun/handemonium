import { useState, useEffect } from "react";
import LoadingIcon from "./LoadingIcon";
import { captureAndSendImage } from "@/utils/ImageCapture";
import GameState from "@/GameState";
import Image from "next/image";

interface AnswerScreenProps {
  answer: [string, number];
  onTimerEnd: () => void;
  gameState: GameState;
}

const AnswerScreen: React.FC<AnswerScreenProps> = ({ answer, onTimerEnd, gameState }) => {
  const [countdown, setCountdown] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await captureAndSendImage("http://localhost:8000");
        console.log(response);
        for (const user in response) {
          if (parseInt(response[user]) === answer[1] + 1) {
            gameState.updateScore(user);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
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
    })();
  });


  return (
    <div className="bg-blue-800 flex flex-col items-center justify-center h-screen">
      {isLoading && <h2 className="text-2xl font-bold mb-10">Keep your hands up!</h2>}
      <h1 className="text-6xl font-bold mb-8">The correct answer was:</h1>
      {!isLoading && (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 h-32 mt-8">
          <Image
            src={`/option${answer[1] + 1}.png`}
            className="w-12 h-12"
            alt={`/option${answer[1] + 1}`}
          />
          <div className="ml-4">
            <p className="text-2xl font-bold text-black">{answer[0]}</p>
          </div>
        </div>
      )}
      {isLoading && <LoadingIcon />}
    </div>
  );
};

export default AnswerScreen;
