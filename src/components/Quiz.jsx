import { useState, useCallback } from "react";
import QUESTIONS from "../utils/questions.js";
import quizCompletedImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";
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
    return (
      <div id="summary">
        <img src={quizCompletedImg} alt="Quiz Completed" />
        <h2>Quiz completed</h2>
      </div>
    );
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
