import { useRef } from "react";

export default function Answers({
  answers,
  onSelectAnswer,
  answerState,
  selectedAnswer,
}) {
  const shuffledQuestions = useRef();
  if (!shuffledQuestions.current) {
    shuffledQuestions.current = [...answers];
    shuffledQuestions.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffledQuestions.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let answerClass = "";
        if (answerState === "answered" && isSelected) {
          answerClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          answerClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelectAnswer(answer)}
              className={answerClass}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
