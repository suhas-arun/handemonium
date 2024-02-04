import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface TimerProps {
  countdown: number;
}

export const Timer: React.FC<TimerProps> = ({ countdown }) => {
  return (
    <div className="flex justify-center items-center h-24 w-24">
      <CircularProgressbar
        value={countdown}
        maxValue={5}
        text={countdown.toString()}
        styles={buildStyles({
          textSize: "24px",
          pathColor: "white",
          textColor: "white",
          trailColor: "rgba(255, 255, 255, 0.1)",
        })}
      />
    </div>
  );
};

export default Timer;
