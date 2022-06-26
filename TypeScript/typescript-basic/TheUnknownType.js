"use strict";
// The Unknown Type
var userInput;
var userName;
userInput = 5;
userInput = 'Max';
// userName = userInput; // unknown 형식은 string을 담을 수 없다
if (typeof userInput === 'string')
    userName = userInput;
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
var result = generateError('Error', 500);
console.log(result);
// generateError('에러 발생', 500);
// Never type
/*
function generateError(message: string, code: number): never { // never => 논리적으로 끝까지 실행될 수 없는 함수의 반환 값은 never 타입
    throw {message: message, errorCode: code};
    // while(true) {}
}
*/
// Wrap Up
