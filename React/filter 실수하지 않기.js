const { useState, useRef, useMemo } = require("react");

// React에서 Filter 사용 실수 줄이기

// 기본 방법
function App() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]); // 잘못된 필터를 위한 변수
    const [query, setQuery] = useState(""); // 적절하게 필터 적용하는 방법 변수
    const inputRef = useRef();

    // 필터를 제대로 적용하는 방법 변수, items 혹은 query 데이터의 변화가 있을 때 렌더링
    const filteredCorrectItems = useMemo(() => {
        return items.filter(item => {
            return item.toLowerCase().includes(query.toLowerCase());
        })
    }, [items, query]);

    // 값 입력(저장)
    function onSubmit(e) {
        e.preventDefault();

        const value = inputRef.current.value;
        if (value === "") return;
        
        setItems(prev => {
            return [...prev, value];
        })

        // 필터 2 버전을 위한 값 저장
        setFilteredItems(prev => {
            return [...prev, value];
        })

        inputRef.current.value = ""; // 추가 후 빈칸 만들기
    }

    // 검색을 위한 실수있는 필터 1
    function onChange1(e) {
        const value = e.target.value;

        setItems(prev => {
            prev.filter(item => {
                item.toLowerCase().includes(value.toLowerCase());
            })
        })
    }

    // 검색을 위한 실수있는 필터 2
    function onChange2(e) {
        const value = e.target.value;

        setFilteredItems(
            items.filter(item => item.toLowerCase().includes(value.toLowerCase()))
        );
    }

    return (
        <>
            검색:
            <input type="search" onChange={e => setQuery(e.target.value)} value={query} />
            <br />
            <br />
            <form onSubmit={onSubmit}>
                새로운 아이템: <input type="text" ref={inputRef} />
                <button type="submit">추가</button>
            </form>
            <h3>아이템:</h3>
            {filteredCorrectItems.map(item => {
                <div>{item}</div>
            })}
        </>
    )
}