import { useState, useEffect } from "react";
export default function QuestionTimer({ timeOut, onTimeOut, mode }) {
  const [progressTimer, setProgressTimer] = useState(timeOut);

  useEffect(() => {
    const timer = setTimeout(onTimeOut, timeOut);
    return () => {
      clearTimeout(timer);
    };
  }, [onTimeOut, timeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Interval");
      setProgressTimer((prevTime) => (prevTime -= 100));
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <progress
      id="question-time"
      value={progressTimer}
      max={timeOut}
      className={mode}
    />
  );
}
