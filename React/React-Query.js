/**
 * useEffect 대신에 React Query
 * API 호출을 위해 React Query
 * 쉬운 API 호출, 읽기 쉬운 코드
 * Video, https://www.youtube.com/watch?v=Kjkx2BASAZA
 */

const { useEffect, useState } = require("react");


// 실행 순서 1. console.log("Component Mounted"); => 2. console.log("Fetching 시작"); => 3. console.log("Products: ", products);
// useEffect()로 작성한 코드는 읽기 어려운 부분이 있으며 호출에 필요한 코드가 길다.
const fetchProducts = async () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    try {
        setLoading(true);

        console.log("Fetching 시작");
        const response = await axios.get("...");
        const products = response.data;

        console.log("Products: ", products);
        if (products) setProducts(products);
    } catch (e) {
        setError(e);
    }

    setLoading(false);
}

useEffect(() => {
    console.log("Component Mounted");
    fetchProducts();
})

return (
    <div>
        {products.map((product) => (
            <Product key={product.id} product={product} />
        ))}
    </div>
)

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 그러나 useQuery로 작성을 하면 분리된 API 요청 함수 호출, 원하는 Key 값으로 처리 가능
// 코드가 더 짧아지고 읽기 쉬워짐
// 실행 순서 1. Render => 2. Loading => 3. Fetching products => Component Mounted => 4. Products: {}

// API 호출을 위한 함수
export const fetchProducts = async () => {
    console.log("Fetching products");
    const response = await axios.get("...");
    const products = response.data;

    console.log("Products: ", products);
    return products
}

const { isError, isSuccess, isLoading, data, error } = useQuery(
    ["products"], // key
    fetchProducts, // api call function
    { staleTime: 60000 } // 데이터가 fresh에서 stale 상태로 변경에 걸리는 시간. data를 reFetch하지 않는다. fresh 상태일 때는 쿼리 인스턴스가 새롭게 mount 되어도 네트워크 fetch 발생X. 데이터가 한 번 fetch 되고 나서 staleTime이 지나지 않으면 unMount하고 나서 Mount가 되어도 fetch 발생X
);

// data를 담는 변수
const products = data;
// 전체 Products의 길이
const TotalNumberOfProducts = products?.length;
// Products의 가격이 300 이상일 때의 길이
const numberOfProductsOver300 = useMemo(
    () => products?.filter((p) => p.price >= 300).length
)

// useQuery 또 다른 사용법
const cartQuery = useQuery(["cart"], fetchCart, { staleTime: 60000 });
const productsQuery = useQuery(["products"], fetchProducts, { staleTime: 60000 });
const cart = cartQuery.data;
const products = productsQuery.data;

/**
useEffect(() => {
    console.log("Component Mounted");
});
*/

if (isLoading) {
    console.log("Loading");
    return <div>Loading</div>;
}

if (isError) {
    console.log("Error: ", error);
    return <div>Error</div>;
}

return (
    <div>
        {data && data.map((product) => <Product key={product.id} product={product} />)}
    </div>
)

