import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';

// 알아둘 것
// primitive - strings, numbers, booleans, null, undefined
// non-primitive - object, arrays
const useEffectDontMistake = () => {
    const [number, setNumber] = useState(0);
    const [name, setName] = useState("");

    // 첫 번째 렌더링일 때 순서 - 2
    // [number]가 없었을 때는 버튼 클릭 시(input 입력 시) count가 +1씩
    // 만약 []으로 비어있다면 useEffect는 처음 렌더링 이후 X
    useEffect(() => {
        console.count(number);
        document.title = `${number}번 클릭하였습니다.`;
    }, [number]);

    // useEffect의 []이 채워져 있거나 비어 있거나 이벤트가 발생할 때마다 반응
    console.count("컴포넌트가 렌더링되었습니다.");

    return (
        <div>
            {/* 첫 번째 렌더링일 때 순서 - 1 */}
            {/* 첫 번째 렌더링일 때 순서 - 3 */}
            <span>{number}번 클릭하였습니다.</span>
            <button onClick={() => setNumber((prev) => prev + 1)}>
                증가
            </button>
            <input onChange={(e) => setName(e.target.value)} />
        </div>
    )
}

const dependencyMistakes = () => {
    const [name, setName] = useState("");
    const [state, setState] = useState({
        name: "",
        selected: false,
        age: 20,
        city: ""
    });

    // 렌더링 최적화, 같은 이벤트가 감지되었을 경우 딱 한 번만 렌더링
    const user = useMemo(() => ({
        name: state.name,
        selected: state.selected
    }), [state.name, state.selected]);

    // 상태에 이벤트 변화가 감지되었을 때마다 출력
    // useMemo를 사용하지 않을 경우, state.name, state.selected로 따로 사용하는 것도 useMemo와 같은 결과
    useEffect(() => {
        console.log("상태 변화가 감지되었습니다.");
    }, [user])

    // 이름 추가로 저장
    const handleAdd = () => {
        setState((prev) => ({ ...prev, name }));
    };

    // selected를 true로
    const handleSelect = () => {
        setState((prev) => ({ ...prev, selected: true }));
    };

    return (
        <div>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <button onClick={handleAdd}>이름 추가</button>
            <button onClick={handleSelect}>선택</button>
            {`{
                name: ${state.name},
                selected: ${state.selected.toString()}
            }`}
        </div>
    );
}

const updatingUseEffect = () => {
    const [number, setNumber] = useState(0);

    // 아래처럼 작성할 경우, 렌더링이 거대하게 발생
    // useEffect(() => {
    //     setInterval(() => {
    //         setNumber(number + 1);
    //     }, 1000);
    // }, [number]);

    // 아래처럼 작성할 경우, JSX에 변화가 없을 경우 렌더링은 딱 한 번만 발생
    useEffect(() => {
        const interval = setInterval(() => {
            setNumber((prev) => prev + 1);
        }, [1000]);

        return () => {
            clearInterval(interval);
        }
    }, []);
    // Interval 실행 -> ClearInterval 실행 -> Interval 실행

    return (
        <div>
            {number}
        </div>
    );
}

const cleanUpUseEffect = () => {
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        console.log("Effect 실행");

        return () => {
            console.log("Clean Up 이전");

            console.log("Clean Up 완료")
        }
    }, [toggle]);
    // Effect 실행 -> Clean Up 이전 -> Clean Up 완료 -> Effect 실행

    return (
        <div>
            <button onClick={() => setToggle(!toggle)}>토글</button>
        </div>
    );
}

const useEffectAPI = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Post 하고 나서 뒤로 가기로 이전 페이지로 이동했을 때, Post가 다시 발생하는 경우를 취소하기 위한 것
        let isCancelled = false;
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data) => {
                if (!isCancelled) {
                    setPosts(data);
                }
            });
        
        return () => {
            isCancelled = true;
        }
    }, []);

    return (
        <div>
            {
                posts?.map((p) => (
                    <p key={p.id}>{p.title}</p>
                ))
            }
        </div>
    );
}

const useEffectAPILink = () => {
    const [user, setUser] = useState({});
    const id = useLocation().pathname.split("/")[2];

    useEffect(() => {
        // 링크를 여러번 클릭했을 때 한 번씩 발생하는 것이 아니라 마지막 전에 클릭한 것은 취고하고 마지막 클릭만 출력
        let isCancelled = false;

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (!isCancelled) {
                    setUser(data);
                }
            });
        
        return () => {
            isCancelled = true;
        }
    }, [id]);

    // AbortController로 isCancelled 대체 가능
    useEffect(() => {
        // 링크를 여러번 클릭했을 때 한 번씩 발생하는 것이 아니라 마지막 전에 클릭한 것은 취고하고 마지막 클릭만 출력
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { signal })
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
            }).catch((err) => {
                if (err.name === "AbortError") {
                    console.log("이전 요청 취소");
                } else {
                    // Handle Error 처리
                }
            });
        
        return () => {
            controller.abort();
        }
    }, [id]);

     // 혹은, Axios로 대체 가능
     useEffect(() => {
        // 링크를 여러번 클릭했을 때 한 번씩 발생하는 것이 아니라 마지막 전에 클릭한 것은 취고하고 마지막 클릭만 출력
        const cancelToken = axios.CancelToken.source();
        
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`, { cancelToken: cancelToken.token })
            .then((res) => {
                setUser(res.data);
            }).catch((err) => {
                if (axios.isCancel(err)) {
                    console.log("이전 요청 취소");
                } else {
                    // Handle Error 처리
                }
            });
        
        return () => {
            cancelToken.cancel();
        }
    }, [id]);

    return (
        <div>
            <p>Name: {user.name}</p>
            <p>UserName: {user.username}</p>
            <p>Email: {user.email}</p>
            <Link to="/users/1">Fetch User 1</Link>
            <Link to="/users/2">Fetch User 2</Link>
            <Link to="/users/3">Fetch User 3</Link>
        </div>
    );
}

// StrictMode일 경우, 처음에 렌더링이 한 번 실행되고 나서 나의 코드로 렌더링 한 번 더 실행 (오류 방지를 위해, 개발자 모드일 때만 적용)

export default useEffectDontMistake