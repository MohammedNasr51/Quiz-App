import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
export default function Question({
  Question,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  onSkipAnswer,
  timeOut,
}) {
  return (
    <div id="question">
      <QuestionTimer timeOut={timeOut} onTimeOut={onSkipAnswer} />
      <h2>{Question}</h2>
      <Answers
        answerState={answerState}
        answers={answers}
        onSelectAnswer={onSelectAnswer}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
}
