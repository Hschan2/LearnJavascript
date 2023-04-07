# Middleware를 사용해야 하는 이유
가끔, 기업에서 제공하고 있는 서비스에서 사용자들이 로그인을 하지 않은 채로 또는 토큰이 만료된 상태로 접근이 불가능한 페이지에 직접 URL을 입력하고 접근 시도를 하는 상황이 존재한다.   

그렇게 유효한 토큰없이 페이지에 접근 시도를 하게 되면 500 에러가 발생한 후, 다른 페이지(예. 로그인 화면)으로 리다이렉트되는 상태가 지속될 수 있다.   

토큰이 없을 때, 리다이렉트 되는 로직이 존재해도 접근 시도한 페이지에서 불러오는 API 콜과 리다이렉트 되는 과정이 중첩되면서 API 콜 실패로 잠깐 500 에러 화면이 비쳐지고 리다이렉트되는 경우가 발생한다.   

이런 상황이 지속되다보면 실제로 크리티컬한 이슈 메세지가 올 때, 한 번에 확인하기 쉽지 않고 사용자 경험상으로도 500 에러 페이지가 비춰지지 않고 리다이렉트 되는 편이 더 좋을 수 있기 때문에 개선이 필요하다.   

개선이 필요한 내용은 사용자에게 에러 화면 노출없이 리다이렉트 시키고 해당 내용을 한 곳에서 처리하는 것이다. 이 때, Next JS의 <b>Middleware</b>를 사용하면 개선이 가능하다.   

## Next JS, Middleware
이는, Request가 완료되기 전에 코드를 조작할 수 있게 도와준다. 특정, Request에 따라 특정 Request에 Response를 Rewriting, Redirecting, Modifying을 할 수 있다.   

예를 들면, 토큰없이 접근하지 못하는 페이지가 ```/auth``` 하위에 존재했을 때, 아래와 같이 Request URL에 /auth를 포함하는 요청들을 구분해서 응답값을 조절할 수 있다.   

```
if (!token && req.nextUrl.pathname.includes('/auth')) {
	...
}
```

참고로, Middleware는 Next JS v12.2.0으로 올라오면서 안정화되었다.   

## Middleware 사용하기
1. ```page```와 같은 레벨에 ```middleware.ts``` 파일 생성하기
2. 해당 파일에 코드를 작성하면 Middleware 적용이 완료
    * Middleware 프로젝트의 매 라우팅에서 실행되고, 아래는 실행 순서
    ```
    1. headers from next.config.js
    2. redirects from next.config.js
    3. Middleware (rewrites, redirects, etc.)
    4. beforeFiles (rewrites) from next.config.js
    5. Filesystem routes (public/, _next/static/, Pages, etc.)
    6. afterFiles (rewrites) from next.config.js
    7. Dynamic Routes (/blog/[slug])
    8. fallback (rewrites) from next.config.js
    ```
3. Middleware 실행 경로 설정하기
    * Custom matcher config: middleware.ts 파일에서 config를 하나 설정하여 해당 파일 자체가 config에 matcher 경로에 해당하는 경우만 실행되도록 필터링
    * Conditional statements
4. 리다이렉트 시키기
    * Request에 URL에 따라 리다이렉트 시키는 부분에서는 NextResponse API 사용
    ```
    1. 들어오는 요청을 다른 URL로 redirect 시켜준다.
    2. 주어진 URL을 디스플레이하면서 response를 rewrite 하게 해준다.
    3. API Routes를 위한 request 헤더를 설정 (getServerSideProps), 목적지를 rewrite
    4. cookies 응답값을 설정
    5. headers 응답값을 설정
    ```

들어오는 요청대로 다른 URL로 리다이렉트 시켜주는 부분은 대략적으로 아래와 같이 사용할 수 있다.   

Conditional statements를 활용하여 Request URL을 판별하였다고 하였으나, 첫 번째의 Config matcher가 존재하는 이유는 Static과 Public 파일들을 구별 해내기 위함이다. 해당 코드는 ```middleware.ts```에서 확인할 수 있다.   

그 외, 현 디바이스를 확인하여 모바일 환경 또는 데스크탑 환경을 설정하거나, Header 설정, 쿠키 설정 등이 있다.

## 시작하기

```
npm run dev
```

## Vercel로 배포하기

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
