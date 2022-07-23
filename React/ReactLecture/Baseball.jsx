import React, {Component, useState, memo, createRef, useRef} from 'react';
import Try from './try.js';

// 외부에서 작성한 함수는 Hook 영향 X
function getNumbers() { // this를 사용하지 않을 때. class 안에다 사용해도 된다(이때는 this.getNumbers()로)
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for(let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

// Hook ver.
// 자식들이 모두 PureComponent나 memo면 부모도 PureComponent나 memo를 적용할 수 있다.
const Baseball = memo(() => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const inputRef = useRef(null); // Hook ver. Ref

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')) {
            setResult('홈런');
            setTries((prevTries) => { // 옛날 걸로 현재 걸 만든다 => 함수형
                return [...prevTries, {try: value, result: '홈런'}];
            });
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputRef.current.focus();
            // react.createRef ver.
            // this.inputRef.current.focus();
        } else { // 틀렸을 때
            if(tries.length >= 9) {
                setResult(`10번 이상 시도로 게임 종료, 답은 ${answer.join(',')}`);
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                inputRef.current.focus();
                // react.createRef ver.
                // this.inputRef.current.focus();
            } else {
                for(let i = 0; i < 4; i++) {
                    if(answerArray[i] === answer[i]) {
                        strike++;
                    } else if(answer.includes(answerArray[i])) {
                        ball++;
                    }
                }
                setTries((prevTries) => {
                    return [...prevTries, {try: value, result: '${strike} 스트라이크, ${ball} 볼 입니다.'}];
                });
                setValue('');
                inputRef.current.focus();
                // react.createRef ver.
                // this.inputRef.current.focus();
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    // Ref를 쉽게 하는 방법 (클래스 사용에서 Hook에서 사용하는 것처럼 비슷하게 만들기. current를 사용해서 달라짐을 적게)
    // react.createRef ver. => Class 사용을 했을 때
    // inputRef = createRef();

    // 이전 방식
    // 함수 형식이기 때문에 console.log 등 다른 동작 추가 가능
    // 때에 따라 다르게 사용하는 것이 좋음
    // inputRef;
    // inputRef = (c) => {this.inputRef = c;};

    // render 안에 setState() 사용 X => 무한 반복
    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
            <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput} />
            <button>입력</button>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => { // v는 value, i는 index
                    return (
                        // index를 key쓰지 말자. (이 경우에는 학습이기 때문에 예외)
                        <Try key={`${i+1}차 시도 : `} tryInfo={v}></Try>
                    );
                })}
            </ul>
        </>
    );
});

// class Baseball extends Component {
//     state = {
//         result: '',
//         value: '',
//         answer: getNumbers(), // 랜덤 숫자가 추출
//         tries: [], // React에서 배열에 값을 넣을 때, push 사용 비추천
//     };

//     onSubmitForm = (e) => {
//         const {value, tries, answer} = this.state;
//         e.preventDefault();
//         if(value === answer.join('')) { // 맞추었을 때
//             this.setState((prevState) => { // 옛 state를 사용해 현재 state로 만들 때 함수형으로
//                 return {
//                     result: '홈런',
//                     tries: [...prevState.tries, {try: value, result: '홈런'}], // ... => 기존 배열 복사 (기존 배열 안에 값도 복사), {} => 넣을 값
//                 }
//             });
//             alert('게임을 다시 시작합니다.');
//             this.setState({
//                 value: '',
//                 answer: getNumbers(),
//                 tries: [],
//             });
//         } else { // 틀렸을 때
//             if(tries.length >= 9) {
//                 this.setState({
//                     result: `10번 이상 시도로 게임 종료, 답은 ${answer.join(',')}`,
//                 });
//                 alert('게임을 다시 시작합니다.');
//                 this.setState({
//                     value: '',
//                     answer: getNumbers(),
//                     tries: [],
//                 });
//             } else {
//                 for(let i = 0; i < 4; i++) {
//                     if(answerArray[i] === answer[i]) {
//                         strike++;
//                     } else if(answer.includes(answerArray[i])) {
//                         ball++;
//                     }
//                 }
//                 this.setState((prevState) => {
//                     return {
//                         tries: [...prevState.tries, {try: value, result: '${strike} 스트라이크, ${ball} 볼 입니다.'}],
//                         value: '',
//                     }
//                 });
//             }
//         }
//     };

//     onChangeInput = (e) => {
//         this.setState({
//             value: e.target.value,
//         });
//     }

//     render() {
//         return (
//             <>
//                 <h1>{this.state.result}</h1>
//                 <form onSubmit={this.onSubmitForm}>
//                 <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
//                 <button>입력</button>
//                 </form>
//                 <div>시도: {this.state.tries.length}</div>
//                 <ul>
//                     {this.state.tries.map( (v, i) => { // v는 value, i는 index
//                         return (
//                             // index를 key쓰지 말자. (이 경우에는 학습이기 때문에 예외)
//                             <Try key={`${i+1}차 시도 : `} tryInfo={v}></Try>
//                         );
//                     })}
//                 </ul>
//             </>
//         );
//     }
// }

module.exports = Baseball;