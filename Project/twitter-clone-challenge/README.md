# YooP (당신의 단 한장의 사진)

<img src="https://raw.githubusercontent.com/Hschan2/LearnJavascript/d29689c2f7aafe688029ce3811a51433a9aa572a/Project/twitter-clone-challenge/public/logo.svg" alt="banner" width="150" height="150">

<br/>

### **YooP** - 당신의 단 한장의 사진

<br/>

'YooP'은 노마드코더 트위터 클론코딩 챌린지 기반으로 재구현된 프로젝트로, 이용자가 본인이 자랑하고 싶은 단 한 장의 사진을 공유합니다.   

<br/>

## 체험

[Snap-Street](https://twitter-clone-challenge.web.app/)

<br/>

## YooP 개발자

### 프론트엔드

|                           [홍성찬](https://github.com/Hschan2)                            |
| :---------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/39434913?v=4" width="100" height="100"> |
|                       YooP 프론트엔드 개발 <br/> 전체 디자인                        |

<br/>
<br/>

## 기술 스택

#### 프레임워크

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

#### 라이브러리

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![React Slick](https://img.shields.io/badge/React_Slick-CA4245?style=for-the-badge&logo=react-slick&logoColor=white)
![Eslint](https://img.shields.io/badge/Eslint-4B0082?style=flat-square&logo=Eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-FF69B4?style=flat-square&logo=prettier&logoColor=white)

#### 데이터베이스

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

#### 개발 도구

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge)

#### 배포

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

<br/>

## 폴더 구조

```
src
├─ components
    ├─ btn
    ├─ form
    ├─ route
    ├─ screen
    ├─ store
    ├─ style
    ├─ types
    └─ utils
├─ hooks
├─ routes
│  └─ style
│
├─ public
├─ App.tsx
├─ constants.ts
├─ firebase.ts
├─ main.tsx
│
├─ index.html
├─ tsconfig.json
├─ package.json
├─ vite.config.ts
└─ README.md
```

<br/>
<br/>

## 페이지/기능

#### 공통

- 메뉴 레이아웃
- Footer
- 다크모드 버튼

#### 회원 서비스

- 회원가입
  - 유효성 검사 진행
- 로그인
  - 유효성 검사 진행
- 구글, 깃허브의 소셜 로그인 구현
- 미로그인 상태로 홈 접근 시, 자동 로그인 페이지로 이동

#### 홈

- 전체 Tweet 중 랜덤 10개의 슬라이드 형식의 메인 콘텐츠
- 제목, 작성자, 날짜, 좋아요/신고 버튼, 태그 내용이 포함된 전체 Tweet
- 촬영기기 브랜드 필터링

#### 작성

- 미리보기가 포함된 이미지 추가
- 이모지 추가가 가능한 내용 작성
- 태그 추가
- 보정 첨부파일 추가
- 촬영기기 브랜드 선택

#### 인기

- 좋아요가 많은 순서대로 전체 Tweet
  - 좋아요 갯수가 같을 경우, 최신순으로 정렬
- 촬영기기 브랜드 필터링

#### 상세

- 이미지 전체 사이즈
- 제목, 작성자, 작성 날짜, 태그, 보정 첨부파일 다운로드
- 댓글

#### 설정

- 회원 로그아웃
- 회원 탈퇴

<br/>

## 실행화면
- 홈
![Main Slide](https://blog.kakaocdn.net/dn/kyRAZ/btsIVGx14Dd/i08b4YxCKt2gZbHE2AgVhK/img.gif)
![Filtering](https://blog.kakaocdn.net/dn/bP686U/btsIUVI4CIE/VMUjSgMLyRICiLQ36v6ZVK/img.gif)
![Layout](https://blog.kakaocdn.net/dn/laV1i/btsIXvaBr9x/vOKfzbxia6oZXvudRRk0P0/img.gif)

- 가입/로그인
![Sign](https://blog.kakaocdn.net/dn/XCbeS/btsEYYJMxqA/LdUePJvW2ptM44Ekl9nxwk/img.gif)

- 좋아요
![Like](https://blog.kakaocdn.net/dn/J2tPA/btsIWhEoIrk/yKvfcUEJEjiV3ZiDZpUIX1/img.gif)

- 작성
![Write](https://blog.kakaocdn.net/dn/bouINl/btsIWwhadnl/jQwLEHmfmF68lFUXZkFAtk/img.gif)

- 수정
![Update](https://blog.kakaocdn.net/dn/cryxwn/btsIVcqlsuD/cPeqdH47GYyPzqpkogyDW0/img.gif)

- 삭제
![Delete](https://blog.kakaocdn.net/dn/mMsvs/btsIWdW28p2/dzpXLp6kfBwAF3K2IL8Jv1/img.gif)

- 상세
![Detail](https://blog.kakaocdn.net/dn/XCbeS/btsEYYJMxqA/LdUePJvW2ptM44Ekl9nxwk/img.gif)

- 댓글
![Comment](https://blog.kakaocdn.net/dn/2uPYn/btsIUM6Bl7S/zF2fQfNKOB865yibbh4Cy1/img.gif)
![Comment Delete](https://blog.kakaocdn.net/dn/b14OAe/btsIXkAUGNM/PoO2BkHhiw5eedLVA3Kl71/img.gif)

- 프로필
![Profile Update](https://blog.kakaocdn.net/dn/cSSb9i/btsIV37x2EM/oTkGcb4q3OzIMUwwTmYujk/img.gif)

- 다크모드
![Dark Mode](https://blog.kakaocdn.net/dn/dQKloa/btsIXmZbuZw/k0RuDCdxXsZqktVkF522K0/img.gif)

## 기술 선택
#### 파이어베이스 선택
- 프론트엔드 프로젝트로 구체적인 백엔드 구현없이 쉽게 회원 서비스를 포함해 데이터 베이스를 이용할 수 있기 때문에 파이어베이스를 선택하였습니다.
- 파이어베이스에서 데이터 저장 시, 파일 크기 등 제한을 설정할 수 있었습니다.
- 데이터를 가져오는 방법으로 onSnapShot으로 처리하여 데이터 실시간 업데이트가 가능하여 선택했습니다.   

## 개발 과정 중 겪은 문제
- 좋아요 버튼 중복 증가 문제
  - 글 작성 시, 좋아요 버튼을 클릭한 회원 ID를 저장할 수 있는 공간을 생성해 좋아요 버튼을 누른 사용자의 경우, 좋아요 버튼을 누른 회원을 저장하는 공간에 저장하여 중복 증가가 되지 않도록 방지하였습니다.   

## 이 프로젝트를 개발한 이유
노마드코더에서 자기주도적 학습 역량 발전을 위해 진행한 클론코딩 챌린지에 참여하여, 자기주도적 학습 자세를 갖추고, 하나의 서비스를 구현하기 위해 이 프로젝트를 개발하였습니다. 개발은 현재진행중이며, 추가적으로 기능을 추가해나갈 계획입니다.   

## 개발 계획
- 댓글 답변
- 비밀번호 수정
- 코드 최적화 리팩토링(SOLID, 디자인 패턴 기반)

## 프로젝트 주요 타겟
- 사진을 자랑하고 싶은 사람들과 함께 커뮤니티를 구성하고 싶은 사람

## 실행

```
npm install
npm run dev
```
