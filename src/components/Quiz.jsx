import { useState, useCallback } from "react";
import QUESTIONS from "../utils/questions.js";
import quizCompletedImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";
const QUESTION_TIME_LIMIT = 10000;

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const currentQuestion =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const isQuizCompleted = currentQuestion === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(newAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
      setTimeout(() => {
        if (newAnswer === QUESTIONS[currentQuestion].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [currentQuestion]
  );

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
        question={QUESTIONS[currentQuestion].text}
        answers={QUESTIONS[currentQuestion].answers}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
        timeOut={QUESTION_TIME_LIMIT}
      />
    </div>
  );
}
