const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9)); // () 안에 초기값. state를 0~9의 무작위 숫자로 넣는 것으로 선언하겠다
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState(''); // state를 비어는 것으로 선언하겠다
    const [result, setResult] = useState('');
    const inputRef = useRef(null); // ref 쓰는 방법. (초기값)

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second) {
            setResult(first + ' X ' + second + ' = ' + value + ', 정답!');
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            inputRef.current.focus();
        } else {
            setResult(value + ', 오답!');
            setValue('');
            inputRef.current.focus();
        }
    };

    return (
        <>
            <div>{first} X {second}의 값은?</div>
            <form onSubmit={onSubmitForm} className="forms">
                <input ref={inputRef} onChange={onChangeInput} value={value} className="box"/>
                <button className="btn">입력</button>
            </form>
            <div id="result">{result}</div>
        </>
    );
}

module.exports = GuGuDan;