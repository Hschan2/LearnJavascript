// 가위바위보 게임

import React, {Component, useState, useRef, useEffect} from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

const scores = {
    바위: 1,
    가위: 0,
    보: -1
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

// useEffect 쉽게 생각하기(3x3 표라고 가정하고)
//                          result, imgCoord, score
// componentDidMount          o        o        o
// componentDidUpdate         o        o        o
// componentWillUnmount       o        o        o
// o => 조작 가능
// Hook에서는 useEffect 하나가 result 따로 조작, useEffect 하나가 imgCoord 따로 조작, useEffect 하나가 score 따로 조작

// Class에서 사용
// ComponentDidMount() {
//     this.setState({
//         imgCoord: 3,
//         score: 1,
//         result: 2,
//     })
// }

// Hook에서 사용 (useEffect를 각각 1개씩 3개 사용하거나, 아래처럼 2개로 사용하거나 하나로 묶을 수 있음)
// useEffect(() => {
//     setImgCoord();
//     setScore();
// }, [imgCoord, scores])
// useEffect(() => {
//     setResult();
// }, [result])

// Hook Ver.
const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    // componentDidMount, componentWillUpdate 역할
    // 1 : 1 대응은 아니다
    // useEffect는 함수형으로
    useEffect(() => {
        interval.current = setInterval(changeHand, 100);

        return () => { // componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [imgCoord]);
    // []의 역할은 클로저 문제를 해결
    // useEffect를 실행하고 싶은 State
    // imgCoord이 바뀔 때마다 useEffect 실행
    // []로 빈칸으로 냅두면 처음만 실행하고 신경쓰지 않겠다
    // 여러 개의 값을 넣어도 된다
    // [] => componentDidMount
    // [값 존재] => componentWillUpdate
    // []안에는 꼭 다시 실행할 값만 넣기

    const changeHand = () => {

        if(imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위)
        } else if(imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보)
        } else if(imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위)
        }
    }

    const onClickBtn = (choose) => {
        clearInterval(interval.current);
        const myScore = scores[choose];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        if(diff === 0) {
            setResult('Draw');
        } else if([-1, 2].includes(diff)) {
            setResult('Win');
            setScore((prevState) => prevState + 1);
        } else {
            setResult('Lose')
            setScore((prevState) => prevState - 1);
        }

        setTimeout(() => {
            interval.current = setInterval(changeHand, 1000);
        }, 2000);
    }

    return (
        <>
            <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
                <button id="scissor" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>점수 : {score}점</div>
        </>
    );
}

// 실행 순서
// Class = Constructor -> render -> ref -> componentDidMount -> (setState/props 바뀔 때 -> shouldComponentUpdate -> render -> componentDidUpdate) -> 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸
// shouldComponentUpdate = true일 경우 리렌더링 이 후 componentDidUpdate, false일 경우 리렌더링 X
// class RSP extends Component {
//     state = {
//         result: '',
//         imgCoord: rspCoords.바위,
//         score: 0
//     };

    // 컴포넌트가 새로 시작할 때, 이전 Interval이 실행되고 있는 것을 막기 위해 => 메모리 누수 발생
    // interval;

    // render가 성공적으로 실행됐을 때, componentDidMount 실행, reRender가 발생했을 때 실행 X, 처음에 render가 성공적으로 실행됐을 때
    // 컴포넌트가 처음 render된 후
    // setState를 쓰고 싶은데 어디다 써야될지 모를 때
    // 비동기 요청 많이 함
    // componentDidMount() {
    //     this.interval = setInterval(this.changeHand, 100); // 0.1초마다 반복 작업
    // }

    // reRender된 후에 실행
    // componentDidUpdate() {

    // }

    // 컴포넌트가 제거되기 직전
    // componentDidMount에서 실행된 것을 제거
    // 비동기 요청 정리
    // componentWillUnmount() {
    //     clearInterval();
    // }

    // changeHand = () => {
    //     const {imgCoord} = this.state;

    //     if(imgCoord === rspCoords.바위) {
    //         this.setState({
    //             imgCoord: rspCoords.가위
    //         });
    //     } else if(imgCoord === rspCoords.가위) {
    //         this.setState({
    //             imgCoord: rspCoords.보
    //         });
    //     } else if(imgCoord === rspCoords.보) {
    //         this.setState({
    //             imgCoord: rspCoords.바위
    //         });
    //     }
    // };

    // 고차함수 사용, () => = React에서 자주 사용하는 패턴
    // render에서 <button id="scissor" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>에서 () => 을 대신함
    // onClickBtn = (choose) => () => {
    //     const { imgCoord } = this.state;
    //     clearInterval(this.interval); // Interval 멈춤
    //     const myScore = scores[choose];
    //     const cpuScore = scores[computerChoice(imgCoord)];
    //     const diff = myScore - cpuScore;

        // 점수 차이가 없을 시. 즉, 무승부
        // if(diff === 0) {
        //     this.setState({
        //         result: '비겼다',
        //     });
        // } else if([-1, 2].includes(diff)) {
        //     this.setState((prevState) => { // 인자 실행할 때는 함수형으로 (return)
        //         return {
        //             result: '승리',
        //             score: prevState + 1,
        //         };
        //     });
        // } else {
        //     this.setState((prevState) => { // 인자 실행할 때는 함수형으로 (return)
        //         return {
        //             result: '패배',
        //             score: prevState - 1,
        //         };
        //     });
        // }

        // 게임 후, 2초 뒤 다시 실행
    //     setTimeout(() => {
    //         this.interval = setInterval(this.changeHand, 1000);
    //     }, 2000);
    // };

//     render() {
//         const {imgCoord, result, score} = this.state;
//         return (
//             <>
//                 <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
//                 <div>
//                     <button id="scissor" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
//                     <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
//                     <button id="scissor" className="btn" onClick={this.onClickBtn('보')}>보</button>
//                 </div>
//                 <div>{result}</div>
//                 <div>점수 : {score}점</div>
//             </>
//         );
//     }
// }

export default RSP;