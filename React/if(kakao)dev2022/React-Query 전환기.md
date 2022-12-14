# Redux에서 React-Query로 전환

## React-Query 조금 알아보기
React-Query는 ```데이터 패칭, 캐싱, 동기화를 쉽게 만들어주는 것```이다. 단순 React에서 진행할 경우 데이터 패칭, 캐싱 등 쌓이는 것들이 많다. React-Query로 진행할 경우, Mutation으로 처리할 수 있는 것들이 많다.

즉, React에서 제공하는 기본 Hook으로도 충분히 멋진 비동기 처리 커스텀 훅을 만들 수 있고 필요한 기능만 구현할 수 있으며 별도의 라이브러리 설치가 필요없다.   

그러나 기본 Hook으로 만들기 위해서는 시간과 노력이 필요하고 React-Query 대비 안정성을 확보하기가 어렵다. 그리고 React에서는 꾸준히 이와 관련해서 업데이트를 진행해오고 있다.   

## Redux에서 React-Query 전환하는 이유
Redux에서 비동기 데이터를 처리하기 위해서는 loadStatus(isLoading, isSuccess, isError) 등을 별도로 만들어야 한다. 그러나 React-Query에서는 이는 기본 옵션으로 제공한다.   

Redux는 새로운 API가 나올 때마다 Actions, Reducers, Sagas를 생성해야 한다. 특히, Sagas는 각 API마다 생성해야 하기 때문에 이들이 많아지거나 의존성이 강해지면 복잡해질 수가 있다. 그리고 중간 API에서 문제가 발생한다면 관련된 API를 모두 도달해야 확인할 수 있는 문제가 있다.   

반면, React-Query에서는 각 API가 쿼리로 구성이 되고 서로의 의존은 사용하는 컴포넌트 내에서 전달받고 갱신한다. 그래서 직관적으로 확인할 수 있다.   

Redux에서는 상태를 모두 담기 때문에 클라이언트 사이드인지 서버 사이드인지 확인하기 어렵다. 그러나 React-Query를 사용해 이를 쉽게 구분해 사용할 수 있다.   

또한, 에러 처리에서도 차이를 확인할 수 있다. Redux는 useEffect를 사용해 에러가 발생할 경우 처리할 수 있다. 이러한 구조는 다음과 같다.   

```
정보 API -> 에러 발생 -> loadStatus -> re-render -> 컴포넌트 -> onError 실행
```

복잡하게 진행되는 Redux와 달리 React-Query에서는 과정이 단축이 된다.   

```
컴포넌트 내부
    정보 API Query -> 에러 발생 -> onError 실행
```

Re-render가 되지 않더라도 에러 처리 실행이 가능하게 된다.   

## 다른 라이브러리 대신 React-Query를 사용하는 이유
* Redux에서 API 상태에 따라 화면을 구성하기 위해선 별도의 도구나 상태가 필요
* Redux-Saga는 의존성이 깊은 구조를 만들어 낼 가능성 존재
* Redux는 간단한 API 추가에도 장황한 Boilerplate가 필요
* Redux는 API 에러 핸들링 과정에서 다소 불필요한 작업 발생
* 우수한 비동기 처리 라이브러리가 다수 존재
* 사용하는 방식, 구조, 기능에서 React-Query가 더 적합   

## React-Query 전환 과정
* Redux 고차 컴포넌트 -> Redux Hook
* Redux Hook -> React-Query
* React 16 ver -> React 18 ver

### Redux 고차 컴포넌트 -> Redux Hook
고차 컴포넌트 사용 시, 불필요한 re-render가 발생하거나 전체적인 코드 구조 변경(Props Drilling, Production 등)이 발생할 경우, API 혹은 로직이 누락될 수가 있다.   

[상세 코드 예시 장면](https://youtu.be/YTDopBR-7Ac?t=739)   

Redux Hook을 최적화하는 이유는 전체적인 구조가 변경됨에 따라 언제 작업이 마무리가 될지 모르고 작업 도중 다른 작업이 발생할 수 있다. 그리고 해결할 수 있는 부분을 그대로 두기가 애매해지기 때문에 최적화를 하게 된다.   

### Redux Hook -> React-Query
[상세 코드 예시 장면](https://youtu.be/YTDopBR-7Ac?t=916)   

React 버전에 따라 하나의 API를 처리할 경우, 문제가 되지 않으나 API가 늘어날 때마다 API 상태 관리가 어렵고 관리가 어려워지는 문제가 있었다. 이를 Custom Hook으로 개선이 가능하다.   

#### 새로운 기능과 리팩토링 동시 발생 문제
* Query 작성 방식
* Query Mutation 네이밍
* 폴더 구조 개선
* 프로젝트 기본 옵션
* Query Key 작성 규칙

위 다섯 가지로 문제를 해결할 수 있다.   

Query 작성 방식은 각 API를 동시에 사용할 때, 중복 사용되는 경우가 있다. 이럴 때, 기본 Query (기본 Mutation)의 규칙을 생성해서 개선할 수 있다. 만약 기본 Query에서 공통 옵션을 같이 사용하고 싶다면 규칙을 생성하여 사용할 수 있다.   

규칙은 예로,
* 페이지 단위 Key 값 추가를 하여 페이지 단위 쿼리가 초기화 가능하게 한다.
* Select에서 실질적인 데이터가 있는 값만 반환하도록 하여 쿼리를 사용할 때 중복 Select를 방지한다.
* onError 옵션이 있어야 useErrorBoundary를 설정하도록 처리하여 에러 핸들링 누락을 방지한다.   

또한, 폴더 구조를 더욱 명확하게 개선함으로써 해결할 수 있다. 예를 들어, data라는 폴더 안에 모든 것을 처리했다면 이를 개선하여 queries 폴더를 생성해 GET 방식 호출을 관리하도록 하고 mutations 폴더로 POST, DELETE 등 방식으로 처리하는 것을 관리하도록 하여 목적에 따라 폴더 구조를 개선할 수 있다. 이를 통해서 중복 API 및 로직를 최소화하거나 API 네이밍을 명확히 하거나 import 경로에서 목적을 표현할 수 있거나 동일한 API 요청을 최소화할 수 있다.   

### React 16 ver -> React 18 ver
Suspense 활용이 가능한 점이 가장 큰 장점이다. API 응답이 오고 나서 화면을 구성했어야 하여 중복 요청이 발생하거나 re-render가 발생했던 전과 딜리 Suspense를 도입함으로써 API 요청에 따른 상태에 따라 고려를 할 필요가 없어졌다. 이를 통해, 가독성이 높아지거나 컴포넌트 합성이 가능해진다.   

## 정리
* Hook 기반을 제공하고 캐싱이 지원이 가능해진다.
* 비동기 상태 관리 목적으로 비동기 처리를 위한 유용한 도구를 제공한다.
    * isLoading, isFetching 등 비동기 처리 상태를 나타내는 값이나 Infinite Queries 제공해 무한 스크롤이 가능
* 서버 데이터가 자주 변경되는 경우, 백그라운드 패칭을 지원
    * 일정 주기마다 또는 focus, mount, interval 등 이벤트 발생 시 데이터 호출 가능 (최신 데이터 호출 가능)   

만약 다음과 같은 경우에는 고민해볼 필요가 있다.   

* 서버 사이드 데이터가 거의 없는 경우에는 서버 사이드 데이터가 더 많아질 경우에 사용하는 것이 좋다. (Recoil, Redux 등을 활용)
* React 18에서 비동기 처리 상태때문에 도입하는 경우 고민해볼 필요가 있다. Suspense 사용해 API가 오고 있는 상태인지가 중요하지 않아졌기 때문이다.   

그래도 아쉬운 점은 있다.   

* Mutation은 한 번만 호출하기 위해 Wrapper 함수가 필요하다.
    * Redux-Saga의 takeLatest
* UI 테스트를 진행하게 될 때 Mock API가 필요해질 수 있다.
* 항상 서버 데이터와 같은 데이터를 바라보는 것이 좋지 않을 수 있다.
* 전체적인 데이터 흐름을 파악하기 어려울 수 있다.   

[React-Query 전환기](https://if.kakao.com/2022/session/77)