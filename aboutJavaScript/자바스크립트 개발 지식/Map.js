// Javascript의 Map 대해
const animals = [
    {
        name: 'lion',
        size: 'big',
        isAggressive: true,
        weight: 200,
    },
    {
        name: 'monkey',
        size: 'medium',
        isAggressive: true,
        weight: 30,
    },
    {
        name: 'tiger',
        size: 'big',
        isAggressive: false,
        weight: 150,
    },
    {
        name: 'cat',
        size: 'small',
        isAggressive: false,
        weight: 5,
    },
];

// Map을 사용하기 전

// 첫 번째 For를 썼을 경우

// for(let i=0; i<animals.length; i++) {
//     console.log(animals[i].name);
// }

// for(let animal of animals) {
//     console.log(animal.name);
// }

// 두 번째 forEach를 썼을 경우

// animals.forEach(function(animal, index) {
//     console.log(index, animal.name);
// });

// Map

// animals의 name 값만 받기
// const animalsNames = animals.map(function(animal) {
//     // return animal.name;
//     return `Animal name is ${animal.name}`;
// });

// console.log(animalsNames);

// Filter

// animals에서 medium의 size를 가진 동물만 받기
// const smallAnimals = animals.filter(function(item) {
//     return item.size === 'medium';
// });

// console.log(smallAnimals);

// Reduce
// const numbers = [1, 10, 11, 23, 444];

// const total = numbers.reduce(function(acc, cur) { // (원래 남아있는 값, 현재 값)
//     console.log(acc, cur);
//     return acc + cur; // 앞에 값 + 현재 값
// });

// console.log(total);

/*
    1 10
    11 11
    22 23
    45 444
    489
*/

// animals + Reduce
// const totalWeight = animals.reduce(function(acc, cur) {
//     return acc + cur.weight; // 이전 값 + 현재 값
// }, 0); // 맨 처음 값 0으로 초기화 (이전 값의 첫 번째)

// console.log(totalWeight);

// 외

// const x = 20;
// if(x === 10) console.log('x is 10'); // === -> 자료형과 값이 같아야 성립, == -> 자료형이 달라도 값이 같으면 성립
// else console.log('x is not 10');

// const animal = 'lion';
// const food = animal === 'lion' ? 'meat' : 'apple'; // 간단한 if, else문을 한 줄로

// console.log(food);

// switch(animal) {
//     case 'lion':
//         console.log('animal is lion');
//         break;
//     case 'monkey':
//         console.log('animal is monkey');
//         break;
//     case 'tiger':
//         console.log('animal is tiger');
//         break;
//     case 'cat':
//         console.log('animal is cat');
//         break;
// }

// 함수 간결하게 사용
// const add = (a, b) => a + b;
// const add2 = a => a + 1; // 매개변수가 1개일 때


// Javascript Array Map
const numbers = [1, -1, 2, 3];

const filtered = numbers.filter(n => n >= 0); // 0보다 큰 값 받기

const items = filtered.map(n => '<li>' + n + '</li>'); // 1, 2 ,3 값을 li태그 안으로 map으로 받는다

const html = '<ul>' + items.join() + '</ul>';

// const mapItems = filtered.map(n => {
//     const obj = {value: n};
//     return obj; // 각 인덱스의 값을 value: n로
// });

const mapItems = filtered.map(n => ({value: n})); // ()없이 {value: n}만 쓰면 undefined. 위의 내용과 같다

// console.log(mapItems);

// 모든 것을 가장 간결하게
const finalItems = numbers
    .filter(n => n >= 0)
    .map(n => ({value: n}))
    .filter(obj => obj.value > 1) // 먼저 n 배열에서 0보다 큰 것을 찾고 value: n 값을 map으로 배열하고 마지막으로 1보다 큰 값을 찾다
    .map(obj => obj.value); // value: n으로 가 아닌 값만 표시
console.log(finalItems);

// Filter
// const filtered2 = numbers.filter(function(value) {
//     return value >= 0; // numbers에서 0보다 큰 값 찾기
// });

// 위 코드를 간결하게
const filtered2 = numbers.filter(value => value >= 0);
// 예를 들어, 웹 사이트에서 filter해야할 때

console.log(filtered2);