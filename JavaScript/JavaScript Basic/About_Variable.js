// Javascript Basic
// primitive 데이터 타입 vs object 데이터 타입

// 가장 작은 다위의 데이터 = primitive 데이터 타입
// primitive => number, string, boolean, null, undefined, symbol
let number = 2;
let anotherNumber = number;
let string = '2';

console.log(number);
console.log(anotherNumber);
console.log(string);

anotherNumber = 3; // let 변수는 값의 수정이 가능. const 변수는 X

console.log(anotherNumber);

// object. primitive 외 모든 것 (함수 포함)
let object = { // object는 한 번 선언 후 다시 할당 X. 즉, 레퍼런스 자체를 변경할 수 없지만. object.name = ''; 으로 변경 가능. 가리키는 것으로 변경
    name: 'hong',
    age: 20,
};

console.log(object.name, object.age);

let anotherObject = object; // object 변수의 값을 참조

console.log(anotherObject.name, anotherObject.age);

object.name = 'Pack'; // object의 값 변화는 anotherObject에도 영향 (참조)

console.log(object.name, anotherObject.name); // 둘 다 Park