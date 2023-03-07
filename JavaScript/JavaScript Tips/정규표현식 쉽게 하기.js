/**
 * 정규표현식 쉽게 사용해보기
 * 
 * 정규표현식(Regular Expression)을 사용하다보면 이해가 잘 되지 않은 채로 사용할 때가 있다. 
 * 문법 자체가 어려운 부분이 있기 때문에 이해하기도 어렵다.
 * 
 */

const emailReg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g

/**
 * 위에 정규표현식을 쉽게 이해하는 사람도 있겠지만, 반대인 사람도 있을 것이다.
 * 위에는 이메일 형식으로 제대로 입력했는지 확인하는 정규표현식이다.
 * 그렇다면 정규표현식을 쉽게 사용하는 방법은 없을까? 있다.
 * 
 * 방법 1 - https://github.com/VerbalExpressions/JSVerbalExpressions
 * 방법 2 - https://github.com/danielroe/magic-regexp
 * 
 * 위의 깃허브에 들어가보면 정규표현식을 더 쉽게 사용할 수 있는 방법을 알 수 있다.
 * 위에서 VerbalExpressions를 사용해보자.
 * VerbalExpressions는 정규표현식을 함수처럼 사용해서 처리할 수 있다.
 */

VerEx()
    .stratOfLine()
    .then("어떻게")
    .maybe("사람")
    .then("이름이")
    .maybe("정규식")
    .endOfLine();
// ->
/^(?:어떻게)(?:사람)?(?:이름이)(?:정규식)?$/

/**
 * 이 방법을 사용하는 것은 쉽다.
 * 자바스크립트에 CDN을 추가해서 사용하거나 노드 사용 시, NPM으로 설치해서 사용하면 된다.
 * 
 * https://cdn.jsdelivr.net/npm/verbal-expressions@1.0.2/dist/verbalexpressions.min.js
 * npm install verbal-expressions
 */

import VerEx from 'verbal-expressions';
const VerEx = require('verbal-expressions');

/**
 * 만약, 휴대폰 번호 형식이 맞는지 정규표현식을 사용한다고 가정해보자.
 */

 const 번호정규식 = VerEx()
    .stratOfLine()
    .range('0', '9')
    .repeatPrevious(3)
    .maybe('-')
    .range('0', '9')
    .repeatPrevious(4)
    .maybe('-')
    .range('0', '9')
    .repeatPrevious(4)
    .endOfLine();

console.log(번호정규식.test('010-1234-5678')); // true
console.log(번호정규식.test('010-1234-abcd')); // false

/**
 * 위 처럼  VerbalExpressions을 이용해서 정규표현식을 작성하고 test 메소드를 사용하면 휴대폰 번호 형식으로 입력한 것이 맞는지 확인할 수 있다.
 * 결과 값은 Boolean 형식으로 반환이 된다. 만약, 휴대폰 번호 형식이 맞다면 True를, 아니라면 False를 반환한다.
 * 만약, 정규표현식으로 확인하고 싶다면 아래처럼 작성하여 확인해볼 수 있다.
 */

console.log(정규식);

/**
 * VerbalExpressions으로 작성한 변수를 콘솔로 확인할 수 있다.
 * 또 다른 예로, URL 정규표현식을 만들어보자면 아래처럼 작성할 수 있다.
 */

const URL정규식 = VerEx()
    .stratOfLine()
    .then('http')
    .maybe('s')
    .then('://')
    .anythingBut(' ')
    .endOfLine();

console.log(URL정규식.test('https://naver.com'));