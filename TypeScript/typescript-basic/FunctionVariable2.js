"use strict";
// console.log('My Code!');
function add(a, b, c, d) {
    // console.log(typeof num1, typeof num2, typeof str1); // number number string
    // if(typeof a !== 'number' || typeof b !== 'number') throw new Error('타입 에러');
    var result = a + b;
    if (printResult)
        console.log(d + result); // d + a + b => result is: 52.8 => 앞이 string이여서 문자로 인식
    if (!printResult)
        return a + b;
}
var str1 = '5';
var num1 = 5;
var num2 = 2.8;
var printResult = true;
var resultPhrase = 'Result is: ';
// const result = add(num1, num2, printResult); // str1 + num2를 할 경우 에러. => str1은 문자. => add함수의 인스턴스를 number로 선언했기 때문에
// console.log(result); // num1(숫자) + num2(숫자) = 7.8, str1(문자) + num2(숫자) = 52.8
add(num1, num2, printResult, resultPhrase);
