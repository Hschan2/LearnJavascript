"use strict";
// Function return Type and Void
function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Result is ' + num);
}
/*
function printResult2(num: number): undefined { // undefined => return이 있는 자료형
    console.log('Result is ' + num);
    return;
}
*/
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result); // cb는 숫자 타입의 값을 반환
}
printResult(add(5, 2)); // Result is 7
console.log(printResult(add(5, 2))); // Result is 7, undefined
// Function Types
var combineValues; // combineValues를 function type으로 쓰겠다.
combineValues = add; // return -> 17
// combineValues = 5; // combineValues is not a function at => combineValues는 add를 받았기 때문에 함수형
// 그냥 5를 넣어 사용할 수 없다
combineValues = printResult; // return -> 5, console.log(combineValues(5, 12))의 첫 번째 인자가 5이기 때문
console.log(combineValues(5, 12));
addAndHandle(10, 20, function (result) {
    console.log(result);
});
