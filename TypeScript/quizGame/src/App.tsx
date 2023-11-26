import { useState } from "react";
import "./App.css";
import ScoreScreen from "./components/ScoreScreen";

type Question = {
  prompt: string;
  correctAnswer: string;
  answer: string[];
};

const questions: Question[] = [
  {
    prompt: "하늘은 무슨 색일까요?",
    correctAnswer: "파란색",
    answer: ["파란색", "초록색", "노란색", "빨간색"],
  },
  {
    prompt: "최고의 프로그래밍 언어는 무엇일까요?",
    correctAnswer: "타입스크립트",
    answer: ["자바", "루비", "C#", "타입스크립트"],
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);

  const isGameOver = currentQuestionIndex >= questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  function Quiz() {
    return (
      <>
        <h1>{currentQuestion.prompt}</h1>

        <form
          className="quiz-form"
          onSubmit={(e) => {
            e.preventDefault();

            if (selectedAnswer === currentQuestion.correctAnswer) {
              setScore(score + 1);
            }

            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }}
        >
          {currentQuestion.answer.map((answer) => {
            return (
              <label key={answer}>
                <input
                  onChange={() => {
                    setSelectedAnswer(answer);
                  }}
                  type="radio"
                  name="answer"
                  checked={answer === selectedAnswer}
                ></input>{" "}
                {answer}
              </label>
            );
          })}

          <button>Submit</button>
        </form>
      </>
    );
  }

  return (
    <div className="page">
      {isGameOver ? (
        <ScoreScreen
          score={score}
          totalQuestions={questions.length}
          reset={() => {
            setCurrentQuestionIndex(0);
            setSelectedAnswer("");
            setScore(0);
          }}
        />
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default App;
