# Snap Street (노마드코더 코딩 챌린지)

![banner](https://raw.githubusercontent.com/Hschan2/LearnJavascript/9203c4ba26dd6ae6e4af9195ed002bc87ee51780/Project/twitter-clone-challenge/public/bird-icon.svg)

<br/>

### **스냅스트릿** - 길거리에서 찍은 사진을 공유해보세요.

<br/>

스냅스트릿은 노마드코더 트위터 클론코딩 챌린지를 통해 기획/개발된 프로젝트로, 서비스를 이용하는 모든 사용자가 길거리에서 찍은 사진들을 공유합니다.   

![Snap-Street sign](https://blog.kakaocdn.net/dn/XCbeS/btsEYYJMxqA/LdUePJvW2ptM44Ekl9nxwk/img.gif)
![Snap-Street home](https://blog.kakaocdn.net/dn/bknwpw/btsEZB1CwR4/LUArcQWKi4mxkOQj91Fo60/img.gif)
![Snap-Street profile](https://blog.kakaocdn.net/dn/wtm8T/btsE0hoibq1/eZj6sCc1JMC5q9EjBYyjY0/img.gif)

<br/>

## 체험
[Snap-Street](https://twitter-clone-challenge.web.app/)

<br/>

## 스냅스트릿 개발자

### 프론트엔드
| [홍성찬](https://github.com/Hschan2) |
| :---: |
| <img src="https://avatars.githubusercontent.com/u/39434913?v=4" width="100" height="100"> |
| 퀵뉴스 전체 개발 <br/> 전체 디자인 |

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
<br/>

## 폴더 구조
```
src
├─ components
    ├─ btn
    ├─ form
    ├─ route
    ├─ screen
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
* 메뉴 레이아웃
* Footer   

#### 회원 서비스
* 회원가입
  * 유효성 검사 진행
* 로그인
  * 유효성 검사 진행
* 구글, 깃허브의 소셜 로그인 구현
* 미로그인 상태로 홈 접근 시, 자동 로그인 페이지로 이동   

#### 홈
* Tweet(게시글) 작성
  * 이모지, 사진 파일 포함
* 모든 사용자 게시글 내용 출력
  * 이미지 크게 보기, 좋아요 버튼 구현   

<br/>

## 기술 선택
#### 파이어베이스 선택
* 프론트엔드 프로젝트로 구체적인 백엔드 구현없이 쉽게 회원 서비스를 포함해 데이터 베이스를 이용할 수 있기 때문에 파이어베이스를 선택하였습니다.
* 파이어베이스에서 데이터 저장 시, 파일 크기 등 제한을 설정할 수 있었습니다.   

## 개발 과정 중 겪은 문제
* 좋아요 버튼 중복 증가 문제
  * 글 작성 시, 좋아요 버튼을 클릭한 회원 ID를 저장할 수 있는 공간을 생성해 좋아요 버튼을 누른 사용자의 경우, 좋아요 버튼을 누른 회원을 저장하는 공간에 저장하여 중복 증가가 되지 않도록 방지하였습니다.   

## 이 프로젝트를 개발한 이유
노마드코더에서 자기주도적 학습 역량 발전을 위해 진행한 클론코딩 챌린지에 참여하여, 자기주도적 학습 자세를 갖추고, 하나의 서비스를 구현하기 위해 이 프로젝트를 개발하였습니다. 개발은 현재진행중이며, 추가적으로 기능을 추가해나갈 계획입니다.   

## 프로젝트 주요 타겟
* 길거리 사진을 공유하고 싶은 사람

## 실행
```
npm install
npm run dev
```