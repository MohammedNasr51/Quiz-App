import { useState, useCallback } from "react";
import QUESTIONS from "../utils/questions.js";
import quizCompletedImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import { use } from "react";
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

  const shuffledQuestions = [...QUESTIONS[currentQuestion].answers];
  shuffledQuestions.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={currentQuestion} // Add key prop to QuestionTimer to recreate it every time the currentQuestion changes
          timeOut={QUESTION_TIME_LIMIT}
          onTimeOut={handleSkipAnswer}
        />
        <h2>{QUESTIONS[currentQuestion].text}</h2>
        <ul id="answers">
          {shuffledQuestions.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let answerClass = "";
            if (answerState === "answered" && isSelected) {
              answerClass = "selected";
            }

            if (answerState === ("correct" || "wrong") && isSelected) {
              answerClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={answerClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
