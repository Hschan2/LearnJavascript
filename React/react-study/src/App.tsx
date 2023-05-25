import { useEffect, useState } from 'react';
import './App.css'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const correctPassword = '4299';

function App() {
  const [pressedNumbers, setPressedNumbers] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Bad Password일 때, 재입력 시 에러 메시지 초기화
    if (pressedNumbers.length === 1) {
      setError("");
    }
    // 입력한 비밀번호가 4자리 일 때, 비교
    if (pressedNumbers.length === correctPassword.length) {
      // 비밀번호와 입력한 번호의 값이 같으면 맞다는 변수에 True, 아닐 경우에 에러 메시지를 설정하고 입력한 숫자를 저장하는 배열 초기화
      if (pressedNumbers.join('') === correctPassword) {
        // console.log('Correct Password');
        setIsCorrect(true);
        setError("");
      } else {
        setError('Bad password');
      }
      setPressedNumbers([]);
    }
  }, [pressedNumbers]);

  return (
    <>
      {/* {JSON.stringify(pressedNumbers)} */}

      {/* isCorrect(패스워드 일치)일 경우, 'Success' 출력, 아니면 에러 메시지와 버튼 입력 폼 출력 */}
      {isCorrect ? (
        <div>Success!</div>
      ): (
          <div>
            {error}
            <div className="number-pad">
              {numbers.map((number, idx) => (
                <button
                  className={number === 0 ? 'zero' : ''}
                  key={idx}
                  onClick={() => {
                  setPressedNumbers(cur => [...cur, number]);
                }}
                >
                  {number}
                </button>
              ))}
            </div>
        </div>
      )}
    </>
  )
}

export default App
