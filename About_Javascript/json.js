// JSON
// JavaScript Object Notation

// 1. Object to JSON => Object을 JSON로. callback 함수를 전달한다
// stringify(obj);
let json = JSON.stringify(true);
console.log(json); // true

json = JSON.stringify(['apple', 'banana']);
console.log(json); // ["apple","banana"] => json 규격 방식

const rabbit = { // object
    name: 'tori',
    color: 'white',
    size: null,
    birthDate: new Date(),
    jump: () => { // 함수는 object 데이터가 아니기 때문에 제외 (자바스크립트에만 있는 특별한 데이터도 X)
        console.log(`can jump!`);
    },
};

json = JSON.stringify(rabbit);
console.log(json);

json = JSON.stringify(rabbit, ['name', 'color', 'size']); // name, color, size만 전달 (해당하는 프로퍼티만 쓰면 전달)
console.log(json);

json = JSON.stringify(rabbit, (key, value) => {
    console.log(`key : ${key}, value: ${value}`);
    return key === 'name' ? 'ellie' : value; // key값이 name이면 ellie 전달 아니면 기본 value 전달
});
console.log(json);

// 2. JSON to Object => JSON을 Object로. callback 함수를 전달한다
// parse(json);

// let obj = JSON.parse(true);
// console.log(obj);

console.clear();
json = JSON.stringify(rabbit);
const obj = JSON.parse(json, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return key === 'birthDate' ? new Date(value) : value;
});
console.log(obj);
rabbit.jump();
// obj.jump(); 위에 JSON으로 바꿀 때 jump()는 포함되지 않았기 때문에 에러

console.log(rabbit.birthDate.getDate());
console.log(obj.birthDate.getDate()); // birthDate가 string이기 때문에 에러