const e = React.createElement;

// 컴포넌트 만들기
// class Hook extends React.Component {
//     constructor(props) {
//         super(props);
//     } => Hook 사용하기 전

// Hook => 함수 컴포넌트에 state와 ref를 추가한 것
const Hook = () => { // 함수 컴포넌트라고 부름
    // this.state = {} => 불가

    // Hook 컴포넌트 안에 꼭 들어가 있어야 한다
    const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9)); // () 안에 초기값. state를 0~9의 무작위 숫자로 넣는 것으로 선언하겠다
    const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = React.useState(''); // state를 비어는 것으로 선언하겠다
    const [result, setResult] = React.useState('');
    const inputRef = React.useRef(null); // ref 쓰는 방법. (초기값)
    
    // const [state, setState] = React.useState({
    //     first: Math.ceil(Math.random() * 9), // 첫 번째 숫자 랜덤(1~9)
    //     second: Math.ceil(Math.random() * 9), // 두 번째 숫자 랜덤(1~9)
    //     value: '',
    //     result: '',
    // }); 이렇게 사용도 가능하지만 setState를 할 때 문제가 발생할 수 있음. setState할 때 하나만 바꾸려고 해도 모두를 다 바꿔야함

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second) {
            setResult(first + ' X ' + second + ' = ' + value + ', 정답!');
            // setResult((prevResult) => {
            //     return prevResult + ', 정답!';
            // }); => 함수형으로 사용 가능
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            inputRef.current.focus();
        } else {
            setResult(value + ', 오답!');
            setValue('');
            inputRef.current.focus();
        }
    }

    // onSubmit을 했을 때 React는 setState 인식하고 한 번에 해결. 즉 onSubmit을 했을 때 렌더링은 한 번만!
    return <React.Fragment>
        <div>{first} X {second}의 값은?</div>
        <form onSubmit={onSubmitForm} className="forms">
            <input ref={inputRef} onChange={onChangeInput} value={value} className="box"/>
            <button className="btn">입력</button>
        </form>
        <div id="result">{result}</div>
    </React.Fragment>;
}

ReactDOM.render(<div><Hook /></div>, document.querySelector('#root'));