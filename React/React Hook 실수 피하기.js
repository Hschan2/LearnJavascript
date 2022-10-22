// 1. useState보다 useRef
const { useState, useRef, useEffect, useMemo } = require("react");

// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");

const emailRef = useRef();
const passwordRef = useRef();


function onSubmit(e) {
    e.preventDefault();
    // console.log({ email, password });
    console.log({
        email: emailRef.current.value,
        password: passwordRef.current.value
    })
}

return (
    <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
            // value={email}
            // onChange={e => setEmail(e.target.value)}
            ref={emailRef}
            type="email"
            id="email"
        />
        <label htmlFor="password">Password</label>
        <input
            // value={password}
            // onChange={e => setPassword(e.target.value)}
            ref={passwordRef}
            type="password"
            id="password"
        />
        <button type="submit">Submit</button>
    </form>
)

// 2. useState를 함수형으로 사용하지 말 것
const [count, setCount] = useState(0);

function adjustCount(amount) {
    // setCount((currentCount) => {
    //     return currentCount + amount;
    // })

    setCount(count + amount);
}

return (
    <>
        <button onClick={() => adjustCount(-1)}>-</button>
        <span>{count}</span>
        <button onClick={() => adjustCount(+1)}>+</button>
    </>
)

// 3. State 즉시 업데이트하지 말 것
const [count2, setCount2] = useState(0);

useEffect(() => {
    console.log(count2);
}, [count2])

function adjustCount(amount) {
    setCount2((currentCount) => {
        return currentCount + amount;
    })

    // console.log(count2);
}

return (
    <>
        <button onClick={() => adjustCount(-1)}>-</button>
        <span>{count2}</span>
        <button onClick={() => adjustCount(+1)}>+</button>
    </>
)

// 4. 불필수적인 useEffects
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
// const [fullName, setFullName] = useState("");

const fullName = `${firstName} ${lastName}`;

// useEffect를 사용해도 좋지만 useEffect가 많아질 때마다 혼란스러워진다.

// useEffect(() => {
//     fetch("#").then(d => {
//         setData(d);
//         console.log(d)
//     })
// })

// useEffect(() => {
//     setFullName(`${firstName} ${lastName}`);
// }, [firstName, lastName])

return (
    <>
        <input value={firstName} onChange={e => setFirstName(e.target.value)} />
        <input value={lastName} onChange={e => setLastName(e.target.value)} />
        {fullName}
    </>
)

// 5. 참조 동등 실수
const [age, setAge] = useState(0);
const [name, setName] = useState("");
const [darkMode, setDarkMode] = useState(false);

// useMemo로 문제를 해결 (이전과 같을 경우 추가 렌더링 X)
const person = useMemo(() => {
    return age, name
}, [age, name]);

// darkMode를 클릭해도 실행되는 문제
useEffect(() => {
    console.log(person);
}, [person]);

return (
    <div style={{ background: darkMode ? "#333" : "#FFF" }}>
        Age: {" "}
        <input value={age} type="number" onChange={e => setAge(e.target.value)} />
        <br />
        Name: {" "}
        <input value={name} onChange={e => setName(e.target.value)} />
        <br />
        Dark Mode: {" "}
        <input value={darkMode} type="checkbox" onChange={e => setDarkMode(e.target.checked)} />
    </div>
)

// 6. fetch 요청을 중단하지 말 것
const [loading, setLoading] = useState(true);
const [data, setData] = useState();
const [error, setError] = useState();

// 이럴 경우, 요청이 계속되면 요청 시간이 늘어나면서 불편함 초래. 요청이 완전히 완료되거나 아니면 완전히 취소되도록 할 것
useEffect(() => {
    setLoading(true)
    fetch(url)
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false))
}, [url]);

// AbortController를 추가함으로써 요청을 완전히 완료하거나 취소되도록 설정
useEffect(() => {
    const controller = new AbortController();

    setLoading(true)
    fetch(url, { signal: controller.signal })
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    
    return () => {
        controller.abort();
    }
}, [url]);

return { loading, data, error }