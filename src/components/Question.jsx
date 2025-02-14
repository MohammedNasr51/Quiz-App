import { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../utils/questions";
export default function Question({
  index,
  onSelectAnswer,
  onSkipAnswer,
  timeOut,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  function handleSelectAnswer(newAnswer) {
    setAnswer({
      selectedAnswer: newAnswer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: newAnswer,
        isCorrect: newAnswer === QUESTIONS[index].answers[0],
      });
      setTimeout(() => {
        onSelectAnswer(newAnswer);
      }, 2000);
    }, 1000);
  }
  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuestionTimer timeOut={timeOut} onTimeOut={onSkipAnswer} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answerState={answerState}
        answers={QUESTIONS[index].answers}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={answer.selectedAnswer}
      />
    </div>
  );
}
