# Sentry를 이용한 에러 추적기, React의 선언적 에러 처리
* Sentry
    * Sentry를 이용한 데이터 수집 가능
    * Severity 기준 설정과 모니터링 가능
    * 에러 데이터 분석 가능
* React
    * 기존 에러 처리
    * Error Boundaries
    * 라이브러리와 Error Boundaries
    * 선언적 에러 처리
    * 선언적 에러 처리와 장애 처리   

## 상황
운영 환경에서 PDF 파일 버튼을 클릭할 때 반응이 없는 상황이 발생하였다. 그런데 에러 추적까지 많은 시간이 걸렸다.   

이러한 상황 가정이 있을 때, 프론트엔드에서 에러가 발생하는 것을 우선 알아보자.   

* 예측 가능해 충분히 해결 가능한 부분
    * 데이터 영역에서의 에러
    * 화면 영역에서의 에러
* 예측이 어려워 많은 시간이 소요되는 부분
    * 외부 요인에 의한 에러
    * 런타임 에러   

## 해결
우선 에러 데이터를 쌓기 위해 <b>Sentry</b>를 사용하기 시작한다. 이는 ```실시간 로그 취합 및 분석 도구이자 모니터링 플랫폼```으로 로그에 대한 다양한 정보를 제공하고 시각화 도구를 통해 발생한 이벤트들을 쉽게 분석하도록 도와준다. 그리고 다양한 플랫폼을 지원한다.   

Sentry는 에러 객체와 에러 문자열을 전달할 수 있는 ```CaptureException```과 에러 문자열만 전달할 수 있는 ```CaptureMessage```가 있다. 에러 데이터를 쌓았지만 검색이 어려운 등 문제점이 존재한다. 문제점을 해결하기 위한 방법을 다양한 기능을 활용할 수 있다.   

#### Scope
<b>Scope</b>로 에러 데이터를 풍부하게 쌓아갈 수 있다.   

* configureScope: 사용자 정보 전송이 가능하다.
```
import * as Sentry from '@sentry/react';

Sentry.configureScope((scope) => {
    scope.setUser((
        accountId: 2022,
        email: '...',
    ));

    scope.setTag({
        webviewType: 'WEB'
    })
})
```
* withScope: 해당 에러의 상세정보 전송이 가능하다.
```
import * as Sentry from '@sentry/react';

Sentry.withScope((scope) => {
    scope.setTag('type', 'api');
    scope.setLevel(Sentry.severity.Error);

    Sentry.captureException(new Error('API Internal Server Error));
});
```

#### Context
<b>Context</b>를 이용해 이벤트에 임의의 데이터를 연결할 수 있는 context를 이용해 추가 정보를 전달할 수 있다. 검색은 불가능하다. 정보는 해당 이벤트가 발생한 이벤트 로그에서 확인할 수 있다.

```
const {method, url, params, data, headers} = error.config;
const {data, status} = error.response;

Sentry.setContext('API Request Detail', {
    method,
    url,
    params,
    data,
    headers
})

Sentry.setContext('API Response Detail', {
    status,
    data
})
```

#### Customized Tags
tag는 키와 값이 쌍으로 이루어진 문자열로 인덱싱이 되는 요소이기 때문에 이슈 검색 및 트래킹을 신속하게 진행할 수 있다.   

```
import * as Sentry from '@sentry/react';

Sentry.withScope((scope) => {
    scope.setTag('type', 'api');
    scope.setTag('api', 'general');

    scope.setLevel(Sentry.severity.Error);

    Sentry.captureException(new Error('API Internal Server Error));
});
```

이 방법은 알람 설정 기능에도 활용할 수 있다.

#### Level
이벤트마다 level을 설정하여 이벤트의 중요도를 식별할 수 있다. ```fetal, error, warning, log, info, debug, critical```로 severity를 설정할 수 있다.

```
import * as Sentry from '@sentry/react';

Sentry.withScope((scope) => {
    scope.setTag('type', 'api');
    scope.setTag('api', 'general');
    scope.setLevel(Sentry.severity.Error); // error level로 설정

    Sentry.captureException(new Error('API Internal Server Error));
});

import * as Sentry from '@sentry/react';

Sentry.withScope((scope) => {
    scope.setTag('type', 'api');
    scope.setTag('api', 'general');

    scope.setLevel(Sentry.severity.Warning); // warning level로 설정

    Sentry.captureException(new Error('API Internal Server Error));
});
```

이를 활용해서 이슈 그룹핑이나 알람 조건을 세분화해 조건화하는 것이 가능하다.   

#### Issue Grouping
모든 이벤트는 <b>fingerprint</b>를 가진다. fingerprint가 동일한 이벤트는 하나의 이슈로 그룹화되며 재설정할 수 있도록 만들어준다.   

```
import * as Sentry from '@sentry/react';

const {method, url} = error.config;
const {status} = error.response;

Sentry.withScope((scope) => {
    scope.setTag('type', 'api');
    scope.setTag('api', 'general');

    scope.setFingerprint([method, status, url]); // 같은 API에 대한 에러가 fingerprint에 의해 그룹핑

    Sentry.captureException(new Error('API Internal Server Error));
});
```

그리고 <b>Sentry</b>는 알람 조건을 설정할 수 있다. 특정 이슈가 생기거나 발생할 경우, 특정 조건에 맞으면 정해진 알람을 전달하도록 설정할 수 있다.   

그러나 무분별한 에러 데이터를 쌓는 것은 오히려 복잡함을 전달받을 수 있다. 그래서 유의미한 데이터를 받도록 만들어야 한다.   

```chunk load 에러```나 ```network 에러```는 수집에서 제외하되 ````timeout 에러```는 수집하도록 한다거나 분석하고자 하는 ```API의 http status```를 구분하여 수집하되 ```4xx 에러```는 부분적으로 수집을 제외한다거나 또는 에러 데이터뿐만 아니라 <b>디버깅과 분석</b>에 필요한 추가적인 정보를 수집하는 것으로 설정할 필요가 있다.   

조금 더 견고한 데이터를 수집하기 위해서 <b>서버와의 로그 분석 정합성</b>을 높여볼 필요가 있다. ```custom header```를 추가하여 API를 요청한 서버 로그를 기록한다거나 검색이 되는 요소는 <b>tag</b>를 이용하여 custom header를 수집하는 등 방법을 고려할 필요가 있다.   

## 개선 후 장점
* 브라우저 버전 문제나 빌드 설정 문제로 발생한 예상치 못한 에러들을 발견해 사용자 경험 개선
* 장애 탐지 시간, 원인 파악 후 해결까지의 시간 단축
* CS 인입 시 사용자의 환경에서 재현하지 않아도 에러 원인을 파악하고 정확한 안내 가능
* 개발자 경험 향상   

## 에러 처리 개선
사용자 경험을 어렵게 만드는 기존 에러를 처리할 때가 있다. 하나의 API에서 에러가 발생해도 에러 페이지로 이동할 때처럼 말이다.   

대부분 에러 혹은 예외 케이스는 일반적인 에러, 네트워크 에러, 강제 업데이트, 서비스 점검이 있다. 각 에러마다 보여질 화면과 액션도 존재한다.   

만약 기존에 ```axios interceptor의 reject callback```으로 에러 처리를 하고 있다면 예외 케이스가 있을 경우 추가된 코드가 늘고 전역에서 처리하는 흐름이 맞는지 생각하게 될 것이다. 그리고 에러 화면을 보여주려면 라우트 이동으로 처리해야 하는 불편함이 있다. (```history.push('/error')```) 그리고 전역 에러를 처리하는 것은 수월하지만 화면의 일부만 에러 상태로 대응하는 것은 어렵다.   

이러한 점을 ```Error Boundaries```로 개선할 수 있다. 이를 활용해 하위 컴포넌트 트리의 자바스크립트 에러를 포착하고 <b>Fallback UI</b>를 보여줄 수 있다. 이를 통해 <b>선언적 에러 처리</b>가 가능해진다.   

Error Boundaries를 공식 사이트에서 확인하면 기본 구조의 코드를 확인할 수 있다.   

* getDerivedStateFromError(): 다음 렌더링에서 fallback UI가 보이도록 상태 업데이트
* componentDidCatch(): 에러 리포팅 서비스에 에러를 기록
* render(): 커스텀한 fallback UI 렌더링   

Error Boundaries의 Fallback Component는 직관적으로 작성할 수 있도록 도와주는 라이브러리이다. 서비스 성격이나 에러 상황에 적절한 Fallback Component 구현도 가능하다.   

알아두어야 할 것은 React의 Error Boundaries는 원래 이벤트 핸들러의 에러를 포착하지 않는다. React-Query에서 ```useErrorBoundary``` 옵션을 제공해 API에서 에러가 발생하면 이를 Error Boundaries가 캐치할 수 있다.   

그래서 선언적 에러 처리를 적용하는 과정을 보자면 ```axios interceptor 코드 줄이기 -> Error Boundaries의 관심사 분리 -> Error Boundaries 및 Fallback Component 작성```으로 볼 수 있다.   

그러나 Root Level에서 처리해야 하는 에러는 상위 Error Boundary로 전파하도록 예외 처리가 필요하다. 그리고 IOS에서 unload event가 발생하면 axios에서 호출 중이던 API에서 Network Error가 발생하는데 이러한 에러는 ```Error Boundaries가 포착하도록 하면 안 된다.``` IOS의 location 이동으로 인한 Network Error 방지를 위해 지연시켜야 한다. 오류 화면이 보여지기 전에 앱이 업로드가 되도록하여야 한다.

## 개선 후 장점
* 비즈니스 로직에 집중한 에러 처리 가능 (모든 에러 처리는 Error Boundaries로 위임)
* UI 일부에서 발생하는 에러를 전역으로 전파시키지 않고 처리 가능 (컴포넌트 상위로 에러가 전파되지 않음)
* 그러나 전역에서 처리되어야 하는 에러를 구분 필요   

[Sentry를 이용한 에러 추적기, React의 선언적 에러 처리](https://if.kakao.com/2022/session/84)