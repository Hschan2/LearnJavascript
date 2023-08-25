/**
 * 자바스크립트 최적화 7가지 기법
 * https://javascript.plainenglish.io/7-javascript-powerful-optimization-tricks-you-need-to-know-f0b5da2933de
 */

// 1. Fallback Values (대체값)
// 정의된 값이 Null 또는 Undefined인 경우에만 대체 값 사용
let beforeName;
if (user?.name) {
    beforeName = user.name;
} else {
    beforeName = "Anonymous";
}

// 최적화
const afterName = user?.name ?? "Anonymous";

// 2. Shortly For Switching (스위칭을 간단하게)
// 값을 반환하는 객체를 사용하여 간단하게 생성
const dayNumber = new Date().getDay();

let beforeDay;
switch (dayNumber) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
        break;
}

// 최적화
const afterDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const otherDays = `Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday`.split(',');

const result_1 = afterDays[dayNumber];
const result_2 = otherDays[dayNumber];

// 3. Calls To Functions (함수 호출 간략화)
// 이진 연산자를 사용해 조건에 따라 어떤 함수를 호출할 지 결정 (호출 패턴이 같아야 하는 것이 조건)
function f1() {
    // ...
}

function f2() {
    // ...
}

// 최적화
condition ? f1() : f2();

// 4. Multiple String Checks (여러 문자열 비교)
// 하나의 문자열이 여러 값 중 하나와 일치하는지 확인해야 할 때, 정규표현식으로 간단하게 해결
const beforeIsVowel = (letter) => {
    return (
        letter === "a" ||
        letter === "e" ||
        letter === "i" ||
        letter === "o" ||
        letter === "u"
    );
};

// 최적화
const afterIsVowel = letter => /[aeiou]/i.test(letter);

// 5. For-of
// 일반적인 배열대신 배열 또는 객체를 반복하는데 더 편리하게
const arr_1 = [1, 2, 3, 4, 5];

for (let i = 0; i < arr_1.length; i++) {
    const element = arr[i];
    // ...
}

// 최적화
for (const element of arr) {
    // ...
}

// 5. For-in
const obj_1 = {
    a: 1,
    b: 2,
    c: 3
}

const keys_1 = Object.keys(obj_1);
for (let i = 0; i < keys_1.length; i++) {
    const key = keys_1[i];
    const value = obj_1[key];
}

// 최적화
for (const key in obj_1) {
    const value = obj_1[key];
    // ...
}

// 6. False Checks (거짓 여부 확인)
// 변수가 null, undefined, 0, false, NaN 또는 빈 문자열인지 확인하려면 논리 NOT (!) 연산자를 사용하여 확인 가능
const beforeIsFalse = (value) => {
    if (value === null ||
        value === undefined ||
        value === 0 ||
        value === false ||
        value === NaN ||
        value === ""
    ) {
        return true;
    }

    return false;
}

// 최적화
const afterIsFalse = (value) => !value;

// 7. Secondary Operator (중첩된 삼항 연산자)
// 삼항 연산자는 if-else 문을 간결하게 작성하는데 유용하며, 여러 조건을 체인으로 연결하여 사용 가능
let beforeInfo;

if (value < minValue) {
    beforeInfo = "Value is too small";
} else if (value > minValue) {
    beforeInfo = "Value is too large";
} else {
    beforeInfo = "Value is in range";
}

// 최적화
const afterInfo =
    value < minValue
        ? "Value is too small"
        : value > minValue ? "Value is too large" : "Value is in range";