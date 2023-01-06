# Next JS New Version 13
Next JS(React 문법 사용하는 FrontEnd + BackEnd Framework)의 새로운 버전 13에서 새로운 기능, 바뀐 기능에 대해 요약합니다. 기존의 <b>pages 폴더</b>는 <b>app 폴더</b>를 활용하도록, ```getStaticProps```, ```GetServerSideProps```는 ```use()```, ```fetch()```를 활용해서 사용하도록 변경되었습니다.

## TurboPack
다른 버전보다 더 빠른 퍼포먼스를 보여준다고 한다.   

## 핵심 용법
* app 폴더 & 예약 파일들
    * 기존 방법은 ```pages 폴더```에서 프론트엔드를, ```api 폴더```에서 백엔드를 사용했다.
    * 13 버전에는 ```app 폴더```를 사용해야 한다.
    ```
    예.

    <!-- page.js -->
    export default function Page() {
        return (
            <div>메인페이지</div>
        )
    }

    <!-- layout.js -->
    export default function RootLayout({ children }) {
        return (
            <html>
                <head>
                    <body>
                        <div>네비게이션바</div>
                        <!-- NavBar, SideBar, Footer 등 사용 가능 -->
                        {children}
                    </body>
                </head>
            </html>
        )
    }

    <!-- loading.js -->
    export default function Loading() {
        return (
            <div>로딩중</div>
        )
    }
    ```

* use()
```
export default function Page() {
    return (
        <div>메인페이지</div>
    )
}

export async function getServerSideProps() {
    const res = await fetch('https://dummyjson.com/todos/1')
    const data = await res.json()

    return { props: { data } }
}

=> 

export default function Page() {
    const data = use(getData())

    return (
        <div>메인페이지</div>
    )
}

export async function getData() {
    const res = await fetch('https://dummyjson.com/todos/1')
    const data = await res.json()

    return data
}
```

* fetch(): ```cache: 'no-store'```를 사용함으로써 ```getServerSideProps()```와 비슷하게 동작
```
export async function getData() {
    const res = await fetch('https://dummyjson.com/todos/1', {
        cache: 'no-store'
    })
    const data = await res.json()

    return data
}
```

* image 컴포넌트: 이미지 최적화, 크기 자동으로 제어 (로딩중 레이아웃 밀려나는 문제 해결)
```
import Image from 'next/image';
import avatar from './lee.png';

export default function Page() {
    return (
        <div>
            <Image src={avatar} />
        </div>
    )
}
```

* font: 늦은 로드로 레이아웃 문제 발생하는 것을 방지하도록 변경

* 기타
```
Next JS 12 ver: a 태그로 감싸고 나서 사용
<Link href="/about">
    <a>About</a>
</Link>

Next JS 13 ver: Link 태그는 항상 a 태그를 렌더링하기 때문에 a태그 사용 불필요
<Link href="/about">
    About
</Link>
```