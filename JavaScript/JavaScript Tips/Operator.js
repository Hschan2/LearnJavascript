// Boolean 연산자 && 그 외 연산자
if(false) {
    console.log("true!");
} else {
    console.log("false");
}

// false : 0, -1, '', null, undefined / true : -1, 'hello', 'false'
let number = 9; // let number; => undefined
if(number) {
    console,log("true!");
}
number && console.log(number); // number가 false면 && 뒤에는 실행 X. number = 9이기 때문에 true

// Object를 이용할 시
let object; // undefined 상태
if(object) {
    console.log(object);
}

object && console.log(object.name); // object는 현재 undefined이기 때문에 아무것도 출력 X

object = {
    name: 'ellie',
}
// object에 값이 존재하기 때문에 undefined가 아님. 즉 값 출력