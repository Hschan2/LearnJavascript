import React from "react";

function ScoreScreen({
  totalQuestions,
  score,
  reset,
}: {
  totalQuestions: number;
  score: number;
  reset: () => void;
}) {
  const numberOfWrongAnswer = totalQuestions - score;
  return (
    <>
      <h2>
        Your Score {score}, you got {numberOfWrongAnswer} questions wrong
      </h2>

      <button onClick={reset}>Try Again</button>
    </>
  );
}

export default ScoreScreen;
