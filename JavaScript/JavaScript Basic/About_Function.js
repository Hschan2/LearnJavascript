// Function 선언 및 호출
const num = 1;
const num2 = 2;
const result = num + num2;
console.log(result);

const num3 = 1;
const num4 = 2;
const result = num3 + num4;
console.log(result);

function add(a, b) {
    return a + b;
}

console.log(add(1, 2));

// Function 다른 변수에 할당
const anotherAdd = add;

console.log(anotherAdd(1,2));

// add() = anotherAdd(). add의 주소가 anotherAdd에 할당

function print(a, b) {
    console.log(`${a} ${b}`)
}

print();

// Function Callback
function divide(a, b) {
    return a / b;
}

function surprise(add, divide) {
    const addResult = add(2, 3); // = add(2, 3);
    const divideResult = divide(2, 3);
    console.log(addResult, divideResult);
}

surprise(add, divide);