// 함수형 프로그래밍 vs 객체 지향

// 1. Pure Functions (순수 함수)

// 순수 함수가 아닌 것
let num = 1;

function add(a) {
    return a + num;
}

// 순수 함수인 것
// 동일한 인자를 넣었을 때, 항상 같은 값을 반환
// 언제 선언되었는지 외부에 전혀 영향을 받지 않도록 작성!
function add(a, b) {
    return a + b;
}

const result = add(2, 3);

// 2. Stateless, Immutability (비상태, 불변성)
// 함수형이 아닌 것
let person = {name: 'hong', age: 20};

function increaseAge(person) {
    // 직접 값을 변경 => 비상태, 불변성 X
    person.age = person.age + 1;
    return person;
}

// 함수형인 것
const person = {name: 'hong', age: 20};

function increaseAge(person) {
    // 새로운 Object를 생성하여 결과값으로 전달
    return {...person, age: person.age + 1};
}

// 3. Expressions Only
// if, for, switch 등 여러 문장을 사용하는 것은 함수형 X
let numbers = [1, 2, 3];

function multiply(numbers, multiplier) {
    for(let i = 0; i < numbers.length; i++) {
        numbers[i] = numbers[i] * multiplier;
    }
}

// 함수형인 것
function multiply(numbers, multiplier) {
    return numbers.map(num => num * multiplier);
}

// 4. First-class and higher-order functions
// First-class
const addTwo = a => a + 2;
const multiplyTwo = a => a * 2;
const transform = numbers => numbers.map(addTwo).map(multiplyTwo);
console.log(transform([1, 2, 3, 4]));

// Higher-order functions
const addToppings = topping => food => food + topping;
const egg = addToppings('egg');
const bacon = addToppings('bacon');
console.log(egg('eggs'));
console.log(bacon('bacons'));

// 함수형 프로그래밍을 위해 알아야 할 것
// 1. Monad
// 2. Semigroup
// 3. Applicative
// 4. Monaid
// 5. Functor
// 6. Disjunction