// 여러 개의 자바스크립트 파일을 하나로 묶어주어 하나로 자바스크립트로 만들어주는 것 = WebPack
const React = require('react');
const {Component} = React;
const {useState} = React; // Hook에서 state 사용할 때
// Hook 사용 전 - class WordRelay extend Component {}로 표현
// Hook 사용 후
const WordRelay = () => {
    const [word, setWord] = useState("강아지");
    const [value, setValue] = useState("");
    const [result, setResult] = useState("");
    const inputRef = useRef(null); // reference

    //  Hook 사용하기 전
    // state = {
    //     word: "강아지",
    //     value: '',
    //     result: '',
    // };

    // Hook을 사용할 때는 const를 붙여 변수로 선언해야 한다.
    // Hook 사용 후 this 사용 안함 => 변수로 선언했기 때문에
    const onSubmitForm = (e) => {
        e.preventDefault();
        if(word[word.length - 1] === value[0]) {
            setResult("좋아요");
            setWord(value);
            value('');
            inputRef.current.focus();
            // this.setState({
            //     result: "좋아요",
            //     word: value,
            //     value: '',
            // })
            // this.input.focus();
        } else {
            setResult("다시!");
            setValue('');
            inputRef.current.focus();
            // this.setState({
            //     result: "다시!",
            //     word: '',
            //     value: '',
            // })
            // this.input.focus();
        }
    }

    // useRef 사용하기 전
    // input;

    // onRefInput = (c) => {
    //     this.input = c;
    // }

    const onChangeInput = (e) => {
        // this.setState({
        //     value: e.target.value,
        // });
        setValue(e.target.value);
    }

    // Hook 사용 후 render() {}는 필요 없음
    // this.state.- 로 값을 호출하지 않음, this.으로 사용하지 않음 => 변수로 선언했기 때문에
    // 만약 html에서 태그 안에 class를 사용하고 싶으면 className으로 써야 한다.
    // label 내 For를 사용하기 위해서는 htmlFor를 사용하는 것이 좋다.
    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="wordInput">글자를 입력해요. </label>
                <input ref={inputRef} value={value} onChange={onChangeInput} />
                <button>입력</button>
            </form>
            <div>{result}</div>
        </>
    );
}

module.exports = WordRelay; // WordRelay을 내보내겠다

// HMR(Hot Module Replacement) = 어떤 것에 변경이 발생해서 수정을 한다. (어떤 컴포넌트가 바뀌어서 수정하는 건가)
// WDS(Web Dev Service) = 실제로 서버를 재시작해주어서 업데이트 적용