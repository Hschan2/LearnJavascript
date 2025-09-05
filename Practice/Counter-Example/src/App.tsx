import React, { useState } from "react";

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  // Decrement function
  const handleDecrement = (): void => {
    setCount(count - 1);
  };

  // First increment function
  const handleIncrement1 = (): void => {
    setCount(count + 1);
  };

  // Second increment function (different implementation)
  const handleIncrement2 = (): void => {
    setCount((prevCount: number) => prevCount + 1);
  };

  // Reset function
  const handleReset = (e: any): void => {
    setCount(0);
  };

  return (
    <div>
      <header>
        <h1>Counter Example (Fixed)</h1>
        <p>Current Count: {count}</p>
        <button onClick={handleDecrement}>-1</button>
        <button onClick={handleIncrement1}>+1 (Method 1)</button>
        <button onClick={handleIncrement2}>+1 (Method 2)</button>
        <button onClick={handleReset}>Reset</button>
      </header>
    </div>
  );
}

export default App;
