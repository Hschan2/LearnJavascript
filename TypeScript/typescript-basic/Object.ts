function add(a: number, b: number, c: boolean, d: string) {
    const isResult = a + b;
    if(c) console.log(d + isResult);
    if(!c) return isResult;
}

let number1: number = 5; // 타입과 초기값을 한 번에 선언
// let numstr1: number = '5'; // 만약 문자 타입에 숫자를 초기값으로 설정하면 에러
const number2 = 2.8;
const isPrintResult = true;
let string1: string = '5';

let isResultPhrase = 'Result is: ';

add(number1, number2, isPrintResult, isResultPhrase);
/*
number - 1, 5.3, -10
string - 'Hi, "Hi", `Hi`
boolean - true, false
object - {age: 30}
*/
