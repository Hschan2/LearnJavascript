# 라이브러리로 NPM 배포하기
스토리북으로 배포하는 이유는 일종의 디자인 API(디자인 토큰)라고 생각하면 된다. 다른 사람들이 생성한 디자인을 사용하고 싶거나, 디자이너와 협업을 하거나, 회사에서 공통된 디자인을 사용하고 싶을 때 문서화한다.   

쉽게 말하면, 컴포넌트 계의 플레이스토어이다.   

## 라이브러리 설치
* 파일 생성
* npm init -y
* Storybook 설치
* Styled-components 설치
* Rollup 설치
* Rollup-plugins 설치
* esbuild 설치
* .gitignore 설정

## 파일 설정
* Storybook의 Button을 Styled-components에 맞게 코드 수정
* rollup-config.js 설정

## NPM 배포
* 터미널에 ```npm login```
* 프로젝트 내, docs 파일들을 github repository에 커밋 & 푸시
* npm에 배포 (npm publish)
* 배포된 페이지를 푸시한 repository의 about의 website에 URL 추가
* README에서 사용자를 위한 문서화 작성

## 추가 내용
* 내용 변경이 발생했을 시, npm version patch로 버전 패치 변경
* Major.Minor.Patch
* Commit 메시지가
    * feat 접두사 => Minor Update
    * fix 접두사 => Patch Update
    * docs 접두사 => Patch Update

</br>

## 앞으로 해야할 것들
* 타입스크립트 전환 (배포하기 전 빌드 과정이 바뀌게 될 것)
* Github Actions / Workflow 작성
    * 자동 배포 트리거 시점 만들기
    * Commit 메시지 보고 SEMVer => NPM Update
    * Commit 메시지 보고 SEMVer => Release 문서 생성
    * Storybook Page 배포
* 최적화
    * CJS, ESM 어떤 빌드 방법을 가질 것인가? 최적화
* 아래의 Workflow 만들기
    * Git Commit => 배포 시점 트리거 => NPM Update => Release 문서 생성 => Storybook Page 배포
* Figma 수정 => JSON 생성 => 디자인 토큰 생성 => Github Action Trigger => 저장소에서 사용 가능
* Storybook 커스텀하기 (Storybook example 참고)

[강사님 레포지토리](https://github.com/pocojang/cdd-storybook-wanted)