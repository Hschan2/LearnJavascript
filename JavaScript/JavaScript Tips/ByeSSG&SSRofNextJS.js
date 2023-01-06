/**
 * Next JS에서 SSG, SSR은 사용하지 않는다.
 */

// 이전에는 아래처럼 서버 사이드 렌더링이 존재 (~ Next JS 12 ver.)
async function getServerSideProps(context) { 
    const id = context.param?.id;
    const productsResponse = await fetch("...");
    const products = await productsResponse.json();

    return {
        props: {
            products,
        },
    };
}

// 현재 서버 사이드 렌더링을 작성하는 코드 제거 (Next JS 13 ver. ~)
async function fetchProducts() {
    const productsResponse = await fetch("...", {
        //cache: "force-cache", // SSG, getStaticSideProps
        //cache: "no-store", // SSR, getServerSideProps
        //next: {
        //    revalidate: 20 // ISR, revalidate, for Caching
        //}
    });

    await wait(4000);

    return productsResponse.json();
}

export default async function Page() {
    const products = await fetchProducts();

    return (
        <div>
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    )
}
