import { useState, useCallback } from "react";
import QUESTIONS from "../utils/questions.js";
import quizCompletedImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
const QUESTION_TIME_LIMIT = 15000;

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

  const shuffledQuestions = [...QUESTIONS[currentQuestion].answers];
  shuffledQuestions.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          timeOut={QUESTION_TIME_LIMIT}
          onTimeOut={handleSkipAnswer}
        />
        <h2>{QUESTIONS[currentQuestion].text}</h2>
        <ul id="answers">
          {shuffledQuestions.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
