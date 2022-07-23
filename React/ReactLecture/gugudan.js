const e = React.createElement;

// 컴포넌트 만들기
class GuGuDan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: Math.ceil(Math.random() * 9), // 첫 번째 숫자 랜덤(1~9)
            second: Math.ceil(Math.random() * 9), // 두 번째 숫자 랜덤(1~9)
            value: '',
            result: '',
        }
    }
    // 위에 대신에 아래처럼 써도 된다. constructor(props), super(props); 없애고 사용하는 방법
    // 실무에서 더 많이 쓰는 방법
    //     state = {
    //         first: Math.ceil(Math.random() * 9), // 첫 번째 숫자 랜덤(1~9)
    //         second: Math.ceil(Math.random() * 9), // 두 번째 숫자 랜덤(1~9)
    //         value: '',
    //         result: '',
    //     }

    // 클래스 메서드로 사용하면 더 보기 좋게 쓸 수 있다
    // 아래처럼 직접 만들어서 쓰는 함수는 무조건 화살표로. (e) => {} 이렇게 쓴다
    onSubmit = (e) => {
        e.preventDefault();
        if(parseInt(this.state.value) === this.state.first * this.state.second) {
            this.setState((prevState) => { // 함수형으로 처리하기. setState는 비동기이기 때문에 함수형으로 하면 에러 발생이 줄어듬. 예전 값으로 새로운 값을 만들때는 함수형으로 return해주는 방법으로. this.state... 으로 쓸 때는 함수형으로
                return {
                    result: prevState.first + ' * ' + prevState.second + ' = ' + prevState.first * prevState.second + ', 정답이다!', // result 변경될 값
                    first: Math.ceil(Math.random() * 9), // first 변경될 값
                    second: Math.ceil(Math.random() * 9), // second 변경될 값
                    value: '', // value 변경될 값
                }
            });
            this.inputFocus.focus(); // setState 이후 input에 focus
        } else {
            this.setState((prevState) => {
                return {
                    result: prevState.value + ', 틀렸다!', // result 변경될 값
                    value: '', // value 변경될 값
                }
            });
            this.inputFocus.focus(); // setState 이후 input에 focus
        }
    };
    // 이전 방법
    // this.setState({
    //     result: prevState.first + ' * ' + prevState.second + ' = ' + prevState.first * prevState.second + ', 정답이다!', // result 변경될 값
    //     first: Math.ceil(Math.random() * 9), // first 변경될 값
    //     second: Math.ceil(Math.random() * 9), // second 변경될 값
    //     value: '', // value 변경될 값
    // });
    // this.setState({
    //     result: prevState.value + ', 틀렸다!', // result 변경될 값
    //                 value: '', // value 변경될 값
    // });

    onChange = (e) => {
        this.setState({value : e.target.value});
    };

    inputFocus = (e) => {
        this.inputFocus = e;
    }; // input 칸 focus 선언

    // setState 할 때마다 render() 실행 => 성능 최적화 필요
    render() {
        return ( // 그룹 연산자 ()를 쓰는 이유는 아래 코드가 더 깔끔하게 보이기 위해
            <React.Fragment> {/* root의 div안에 쓸데 없는 div 없애기 위해*/}
                <div>{this.state.first} 곱하기 {this.state.second}의 값은?</div> {/* 구구단 문제 숫자 */}
                <form onSubmit={this.onSubmit} class="forms">
                    {/* ref={(e) => {this.inputFocus = e;}} => 입력 칸 focus에 사용 */}
                    <input ref={this.inputFocus} type="number" class="box" value={this.state.value} onChange={this.onChange} placeholder="답을 입력하세요." /> {/* 입력 칸 */}
                    <button type="submit" class="btn">결과</button>
                </form>
                <div>{this.state.result}</div>  {/* 결과 값 */}
            </React.Fragment>
        );
    }
}

ReactDOM.render(<div><GuGuDan /></div>, document.querySelector('#root'));