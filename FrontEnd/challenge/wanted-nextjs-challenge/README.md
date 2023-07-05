# 원티드 프리온보딩 프론트엔드 챌린지 7월

## 과제 2

### 설명
#### React와 History API 사용하여 SPA Router 기능 구현하기

<aside>
💡 가이드에 따라 코드를 작성하고, 과제 결과물은 각자 깃허브에 public 레포지토리로 업로드 후 디스코드 내 과제 제출 스레드에 링크를 제출해주세요.
</aside>

**1 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.**

- `/` → `root` 페이지
- `/about` → `about` 페이지

**2 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.**

- 힌트 `window.onpopstate`, `window.location.pathname` History API(`pushState`)

**3 Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.**

```
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);
```

**4 최소한의 push 기능을 가진 useRouter Hook을 작성한다.**

```
const { push } = useRouter();
```

**5 아래 스크린샷을 참고하여 앱을 작성한다.**
![Root 경로](https://lean-mahogany-686.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd2a19c69-ed92-4431-afca-156a3d8ccd7e%2FUntitled.png?id=5526a31c-b3c7-4fb8-9b66-cf510264e1ac&table=block&spaceId=7ac0bf59-e3bb-4f76-a93b-27f040ec55b6&width=2000&userId=&cache=v2)
![About 경로](https://lean-mahogany-686.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa10c03a3-1d27-4a02-a495-c7f98775ca23%2FUntitled.png?id=c3f5bcfe-e485-467f-8cd8-b97168c25c1d&table=block&spaceId=7ac0bf59-e3bb-4f76-a93b-27f040ec55b6&width=2000&userId=&cache=v2)

### 참고 **Vite 초기 세팅 ([링크](https://vitejs-kr.github.io/guide/#scaffolding-your-first-vite-project))**

```
$> yarn create vite
# 실행 후 cli의 지시에 따라 react, react-ts 중 택일하여 초기 세팅할 것
```

- https://vitejs-kr.github.io/guide/#scaffolding-your-first-vite-project
- Vite란?
    - 프랑스어로 ‘빠르다’는 뜻을 가진 자바스크립트 빌드 툴
    - 프로젝트 스캐폴딩 템플릿 지원하고, 설정이 매우 간단함(거의 불필요함)
    - CRA에 비해 프로젝트에 담긴 의존성 규모가 작아서 인스톨 시간에 대한 부담이 없음
    - **HMR 및 빌드 속도가 매우 빠름**

### 구현
* main.tsx

<b>react-router-dom</b> 라이브러리를 설치하고, router를 사용하기 위해 App 컴포넌트를 <b>BrowserRouter</b>로 감싸주었습니다.   

```
<BrowserRouter>
    <App />
</BrowserRouter>
```

* App.tsx

뒤로가기 버튼을 클릭하면, 이전 페이지로 이동하도록 useEffect를 구현하였으며, <b>Routes</b>로 '/' 경로와 '/about' 경로를 설정하였습니다.   

```
function App() {
  useEffect(() => {
    window.onpopstate = () => {
      window.location.href = window.location.pathname;
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
```

* Home.tsx

URL의 경로로 이동시키는 커스텀 훅인 useRouter을 선언하고, About 페이지로 이동할 수 있도록 구현하였습니다.   

```
const Home = () => {
    const {push} = useRouter()

    const moveAbout = () => {
        push('/about')
    }

    return (
        <>
            <div>Root</div>
            <button onClick={moveAbout}>about</button>
        </>
    )
};
```

* About.tsx

URL의 경로로 이동시키는 커스텀 훅인 useRouter을 선언하고, Home(Root) 페이지로 이동할 수 있도록 구현하였습니다.   

```
const About = () => {
  const {push} = useRouter()

  const moveRoot = () => {
      push('/')
  }

  return (
    <>
      <div>About</div>
      <button onClick={moveRoot}>go main</button>
    </>
  );
};
```

* useRouter

커스텀 훅으로 <b>window.history.pushState</b>과 <b>window.dispatchEvent</b>, <b>PopStateEvent</b>를 이용해서 path가 있다면 해당 경로로 이동하도록 구현하였습니다.   

```
const useRouter = () => {
  const push = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return { push };
};
```
