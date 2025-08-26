# Gemini가 제안하는 프로젝트 개선 사항

## 1. API 함수 분리 및 일관성 유지

- **현황:** `api`와 `src/api` 두 개의 폴더에 API 관련 함수들이 혼재되어 있습니다.
- **문제점:** API의 역할과 위치를 파악하기 어렵고, 프로젝트 구조의 일관성을 해칩니다.
- **제안:**
    - 서버리스 함수(예: `nodemailer` 사용)는 최상위 `functions` 또는 `serverless-functions` 폴더로 통합합니다.
    - 클라이언트 측 Firebase API 요청은 `src/services` 또는 `src/api` 폴더에 기능별로(예: `userService.ts`, `tweetService.ts`) 파일을 분리하여 일관성 있게 관리합니다.

## 2. 공용 컴포넌트 분리

- **현황:** 각 `features` 폴더 내에 `components`가 있지만, 여러 기능에서 중복으로 사용될 만한 컴포넌트들이 있습니다.
- **문제점:** 코드 중복 및 재사용성 저하의 원인이 됩니다.
- **제안:**
    - `form-input.tsx`, `social-button.tsx`, `modal.tsx` 등 여러 곳에서 사용될 수 있는 범용적인 컴포넌트들은 `src/shared/components` 또는 `src/components/common` 폴더로 이동시켜 재사용성을 높입니다.

## 3. 전역 상태 관리 개선

- **현황:** `Zustand`가 설치되어 있으나, 다수의 컴포넌트에서 `useState`와 `useEffect`를 통해 인증 상태, 사용자 정보 등을 개별적으로 관리하고 있습니다.
- **문제점:** 상태 관리 로직이 분산되어 있어 복잡하고, 불필요한 prop drilling이 발생할 수 있습니다.
- **제안:**
    - 사용자 정보(`user`), 인증 상태(`isLoading`), 다크 모드(`darkMode`) 등 애플리케이션 전역에서 필요한 상태는 `Zustand` 스토어(`src/shared/store`)를 적극적으로 활용하여 중앙에서 관리합니다. 이를 통해 코드 복잡도를 낮추고 컴포넌트 간의 의존성을 줄일 수 있습니다.

## 4. 코드 중복 제거 (Tweet 데이터 Fetch 로직)

- **현황:** `features/tweet/components/timeline.tsx`와 `features/user/hooks/useProfileFetchTweet.ts`에서 트윗 데이터를 가져오는 로직이 각각 구현되어 있습니다.
- **문제점:** 유사한 코드가 중복되어 유지보수가 어렵습니다.
- **제안:**
    - 트윗 데이터를 가져오는 공통 로직을 `src/services/tweetService.ts`와 같은 파일로 분리하고, 각 컴포넌트에서는 이 서비스를 호출하여 사용하도록 리팩토링합니다.

## 5. 타입 정의(Interface) 중복 제거

- **현황:** `features/user/types/profile-type.ts`와 `features/user/types/modal-type.ts`에 `IFollowModal` 인터페이스가 중복으로 정의되어 있습니다.
- **문제점:** 타입 정의의 일관성이 깨지고, 수정이 필요할 때 여러 곳을 변경해야 합니다.
- **제안:**
    - 공용으로 사용되는 타입은 `src/shared/types` 폴더로 이동시키거나, 한 곳에서 정의한 후 다른 파일에서 `import`하여 사용하도록 수정합니다.

## 6. 라우팅 구조 개선

- **현황:** `App.tsx` 파일에 모든 라우트 정보가 정의되어 있습니다.
- **문제점:** `App.tsx`가 비대해지고, 라우트 구조 파악이 어렵습니다.
- **제안:**
    - `src/routes/index.tsx` 또는 `src/Router.tsx` 파일을 생성하여 라우트 관련 설정을 모두 이동시킵니다. `App.tsx`에서는 해당 라우터 컴포넌트만 렌더링하도록 하여 역할을 분리하고 가독성을 높입니다.

## 7. 환경 변수 관리 개선

- **현황:** `firebase.ts` 등 여러 파일에서 `import.meta.env`를 직접 사용하여 환경 변수를 가져오고 있습니다.
- **문제점:** 환경 변수 참조 로직이 분산되어 있어 관리가 어렵습니다.
- **제안:**
    - `src/config.ts` 또는 `src/constants.ts`와 같은 설정 파일을 만들어 해당 파일에서만 `import.meta.env`를 참조하도록 하고, 다른 모든 파일에서는 이 설정 파일을 통해 환경 변수에 접근하도록 구조를 변경합니다.

## 8. 스타일 컴포넌트 네이밍 규칙 개선

- **현황:** 여러 스타일 파일에서 `Wrapper`와 같이 이름이 중복되는 스타일 컴포넌트를 사용하고 있습니다.
- **문제점:** 개발자 도구에서 스타일을 디버깅할 때 혼란을 유발할 수 있습니다.
- **제안:**
    - 각 컴포넌트의 역할에 맞는 명확한 이름(예: `HomeWrapper`, `TimelineWrapper`, `ProfileContainer`)을 사용하여 이름 충돌을 방지하고 디버깅을 용이하게 합니다.
