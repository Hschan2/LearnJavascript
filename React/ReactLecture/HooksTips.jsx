// 1. 선언할 때, 순서가 굉장히 중요하다.
const lottoNumbers = useMemo(() => getWinNumbers(), []);
const [winNumbers, setWinNumbers] = useState(lottoNumbers);
const [winBalls, setWinBalls] = useState([]);
const [bonus, setBonus] = useState(null);
const [redo, setRedo] = useState(false);
const timeouts = useRef([]);

// 2. 변수 선언 시, 조건문 사용 금지 => 문제 발생 가능성 높음
const lottoNumbers = useMemo(() => getWinNumbers(), []);
const [winNumbers, setWinNumbers] = useState(lottoNumbers);
const [winBalls, setWinBalls] = useState([]);
const [bonus, setBonus] = useState(null);
if(조건) { // 기존 아래 5번째 순서였지만 timeouts이 5번째 순서가 된다.
    const [redo, setRedo] = useState(false);
}
const timeouts = useRef([]);
// but, 반복문 안에는 넣어도 되느나 추천하지 않음

// 3. useMemo => return 값을 저장한다
// 4. useCallBack => 함수 자체를 저장한다. 두번째 인자 []값이 변경될 때까지.
// 5. useEffect => 안에 있는 내용을 저장한다. 두번째 인자 []값이 변경될 때까지.

// 6. useEffect는 ComponentDidMount일 때 실행이 된다. 두번째 인자의 값이 바뀌면 ComponentDidUpdate가 실행이 된다.
// 7. useEffect안에는 ComponentDidMount할 것을 넣는다.
// 8. useEffect의 두번째 인자 []안에는 ComponentDidUpdate을 할 것을 넣는다.
// 9. State마다 두번째 인자 값이 다르다. => useEffect 여러 번 사용 가능

// 10. Hooks와 Class 에서의 차이
// Hooks => useEffect(() => {}, [변경할 값])를 사용
// Class => if(prevState.변경값 !== this.state.변경값)를 사용 (ComponentDidUpdate에서)
// Hooks에서는 변경 값이 여러 개면 따로 사용, Class에서는 ComponentDidUpdate에서 조건문을 여러 개하여 함께 사용

// 11. Hooks에서 ComponentDidMount만 하고 싶다.
/*
    useEffect(() => { 요청할 내용 } ,[]); => []을 빈 값으로 둔다.
*/

// 12. Hooks에서 ComponentDidUpdate만 하고 싶다.
/*
    const mounted = useRef();
    useEffect(() => {
        if(!mounted.current) { // 실행은 되지만 아무 행동을 하지 않음
            mounted.current = true;
        } else {
            요청할 내용
        }
    }, [바뀌는 값]);
*/