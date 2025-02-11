import { useState } from "react";
import QUESTIONS from "../utils/questions.js";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const currentQuestion = userAnswers.length;
  const handleUserAnswers = (newAnswer) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
  }
  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[currentQuestion].text}</h2>
        <ul id="answers">
          {QUESTIONS[currentQuestion].answers.map((answer) => (
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
