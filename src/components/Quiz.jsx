import { useState } from "react";
import QUESTIONS from "../utils/questions.js";
import quizCompletedImg from "../assets/quiz-complete.png";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const currentQuestion = userAnswers.length;
  const isQuizCompleted = currentQuestion === QUESTIONS.length;

  if (isQuizCompleted) {
    return (
      <div id="summary">
        <img src={quizCompletedImg} alt="Quiz Completed" />
        <h2>Quize completed</h2>
      </div>
    );
  }

  const shuffeledQuestions = [...QUESTIONS[currentQuestion].answers];
  shuffeledQuestions.sort(() => Math.random() - 0.5);

  const handleUserAnswers = (newAnswer) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
  };
  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[currentQuestion].text}</h2>
        <ul id="answers">
          {shuffeledQuestions.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleUserAnswers(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
