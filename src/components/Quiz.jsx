import { useState, useCallback } from "react";
import QUESTIONS from "../utils/questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";
const QUESTION_TIME_LIMIT = 10000;

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const currentQuestion = userAnswers.length;
  const isQuizCompleted = currentQuestion === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    newAnswer
  ) {
    setUserAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
  },
  []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (isQuizCompleted) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={currentQuestion}
        index={currentQuestion}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
        timeOut={QUESTION_TIME_LIMIT}
      />
    </div>
  );
}
