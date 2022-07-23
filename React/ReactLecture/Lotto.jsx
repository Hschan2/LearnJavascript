import React, {Component, useState, useRef, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';

// 로또 번호 랜덤 뽑기
function getWinNumbers() {
    // 45까지 랜덤 숫자 뽑기
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];

    // 숫자 shuffle에 넣기
    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    // 보너스 숫자 뽑기
    const bonusNumber = shuffle[shuffle.length - 1];
    // 6개 번호 뽑기, 뽑은 숫자 정렬
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

    return [...winNumbers, bonusNumber];
}

// Hook ver.
const Lotto = () => {
    // useMemo = 다시 실행되는 일 방지, 불필요한 렌더링 발생 방지
    // useMemo는 꼭 두 번째 인자 필수. 빈 배열일 경우 다시 실행되는 일 방지
    // 두 번째 인자가 바뀔 시, getWinNumbers() 다시 실행
    // Hooks가 getWinNumbers()의 return을 기억한다.
    // useMemo = 복잡한 함수 값 기억, useRef = 일반적인 값 기억
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    // componentDidMount(), componentDidUpdate(), componentWillUnmount() Hook ver.
    useEffect(() => {
        for(let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => { // current에 직접 넣는 것이 아니라 요소에 값을 넣어주는 것이기 때문에 값 변경으로 치지 않음
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]])
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        // componentWillUnmount
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]);
    // 빈 배열이면 = componentDidMount
    // 배열에 요소가 있으면 = componentDidMount, componentDidUpdate 동시 수행
    // 배열 요소에 componentDidUpdate할 조건 넣어도 가능
    // winBalls.length === 0로 조건을 걸 경우, useEffect가 2번 실행
    //timeouts.current로 조건을 걸 경우, onClickRedo할 때 값이 변경되기 때문에 전과 같은 실행 가능
    // 배열 요소에 변경되는 시점을 넣는 것

    // useCallback = 함수 자체를 기억
    // 함수 자체가 크기가 크다 혹은 비용이 많이 나간다고 할 때, 사용 용이
    // But, 값이 변해도 너무 잘 기억하기 때문에 첫 번째 값이 계속 저장 유지
    // useCallback안에 사용되는 state는 [] 안에 넣어주기 => 이전 값 잊기
    // 아래 <Ball></Ball>같이 자식에 onClick을 하게 되면 useCallback 필수
    const onClickRedo = useCallback(() => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        
        timeouts.current = []; // current에 직접 넣어주는 것이기 때문에 값 변경으로 침
    }, [winNumbers]); // []의 값이 바뀌면 새로 시작

    return (
        <>
            <div>로또</div>
            <div id = "결과창">
                {/* 반복문 */}
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스 숫자</div>
            {/* 조건문 */}
            {bonus && <Ball number = {bonus} />}
            {redo && <button onClick = {onClickRedo}>번호 추출</button>}
        </>
    );
}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(), // 로또 번호
        winBalls: [], // 로또 번호 6개
        bonus: null, // 보너스 숫자
        redo: false,
    };

    // 클리어 작업을 위해, Hook에서 useRef 대신
    timeouts = [];

    runTimeouts = () => {
        const {winNumbers} = this.state;
        for(let i = 0; i < winNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 1000); // 첫 번째 공은 1초, 두 번째 공은 2초... (setTimeout 반복)
        }
        this.timeouts[6] = setTimeout(() => { // 보너스 공 가져오기. 보너스 공은 일곱 번째 공이기 때문에 7초 후
            this.setState({
                bonus: winNumbers[6],
                redo: true, // 한 번 더 버튼 보이기
            });
        }, 7000);
    }

    // 실제로 로또 번호 값 넣어주기 (setTimeout 사용)
    componentDidMount() {
        this.runTimeouts();
    }

    // 버튼 누르고 나서 다시 실행하기 위해
    // prevState => 버튼을 누를 때, 바뀌기 전 값
    // setState 될 때마다 실행
    componentDidUpdate(prevProps, prevState) {
        // 버튼을 누르고 로또 번호가 초기화 되었을 때
        // this.timeouts.length === 0도 가능
        if(this.state.winBalls.length === 0) {
            this.runTimeouts();
        }
    }

    // 공 넣어주기 끝나면 setTimeout 종료
    // setTimeout 클리어 작업, 메모리 누수되는 것을 막음
    // setInterval 같은 메모리 상에 누적되는 것을 위해 사용
    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }

    // 다시 뽑기
    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        });
        this.timeouts = [];
    };

    render() {
        const {winBalls, bonus, redo} = this.state;
        return (
            <>
                <div>로또</div>
                <div id = "결과창">
                    {/* 반복문 */}
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스 숫자</div>
                {/* 조건문 */}
                {bonus && <Ball number = {bonus} />}
                {redo && <button onClick = {this.onClickRedo}>번호 추출</button>}
            </>
        );
    }
}

export default Lotto;