import quizCompletedImg from "../assets/quiz-complete.png";
import QUESTION from "../utils/questions.js";
export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTION[index].answers[0]
  );
  const nOfSkippedAnswers = Math.round(
    (skippedAnswers.length / QUESTION.length) * 100
  );
  const nOfCorrectAnswers = Math.round(
    (correctAnswers.length / QUESTION.length) * 100
  );
  const nOfIncorrectAnswers = 100 - nOfSkippedAnswers - nOfCorrectAnswers;
  return (
    <div id="summary">
      <img src={quizCompletedImg} alt="Quiz Completed" />
      <h2>Quiz completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{nOfSkippedAnswers}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{nOfCorrectAnswers}%</span>
          <span className="text">Correct</span>
        </p>
        <p>
          <span className="number">{nOfIncorrectAnswers}%</span>
          <span className="text">Incorrect</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTION[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTION[index].text}</p>
              <p className={cssClass}>{answer ?? "skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
