/**
 주석 사용법
 */

// 기본 함수 => 이렇게 사용하면 설명도 없고 과거에 자주 사용하던 주석

/** 기본 함수, 이렇게 사용하면 해당 함수 (hello)를 사용할 때 설명도 같이 확인 가능 */
function hello(name, age) {
    return name + age;
}

hello('Hong', 20);


/**
 * 
 * @param {String} name 사람이름 넣은 변수 설명, 타입 젇보도 넣을 수 있음, 자동완성도 타입에 맞게 나옴
 * @param {Number} age 나이 넣는 변수 설명, 타입 정보도 넣을 수 있음, 자동완성도 타입에 맞게 나옴
 * @returns 
 */
function bye(name, age) {
    return name + age;
}

bye('Hong', 20);

/**
 * @readonly 읽기 전용임을 나타냄
 * @const {Number}
 */
const num = 1;

/**
 * @todo 내일까지 다른 변수 추가 (@todo는 메모 기능)
 */
const todo = 'todo';

/**
 * @deprecated 이 함수를 그만 사용할 것 (경고할 때 사용)
 */
function doNotUse() {
    return '사용하지 말 것';
}

doNotUse();

/**@type {string | number} 타입 설정 설명 */
var name = 'kim';

/** @type {number[]} 타입 설정 설명 */
var number = [1, 2, 3];

/**
 * 타입스크립트에서 JS Doc으로 돌아가는 이유
 * 타입스크립트는 너무 엄함
 * 타입스크립트에서 자바스크립트로 변환 과정이 복잡
 * 타입스크립트에서 자바스크립트 변환 시 코드양이 증가하고 코드가 정리되지 않음
 */


/**
 * 만약 타입스크립트에서 사용한다면
 * @param a
 * @param b
 */
function hi(a: string, b: number) {

}

// [자바스크립트 주석 사용법](https://www.youtube.com/watch?v=ORmnc-hLrYs)