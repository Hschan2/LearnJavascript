// 기본 타입

// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// String
let color: string = "blue";
color = 'red';

// ${expr}로 표현 가능
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.
I'll be ${ age + 1} years old next month.`;

// 위의 Sentence 선언과 동일한 사용 방법
let sentence2: string = "Hello, my name is " + fullName + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";

// Array
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3]; // Generic 타입 사용도 가능

// Tuple
let x: [string, number];
// 초기화
x = ["hello", 10]; // 성공
// 잘못된 초기화
x = [10, "hello"]; // 순서의 오류

console.log(x[0].substring(1)); // 성공
console.log(x[1].substring(1)); // 오류, 'number'에는 'substring'이 없다

x[3] = "world"; // 오류, '[string, number]' 타입에는 프로퍼티 '3'(Index 3)이 없다

console.log(x[5].toString()); // '[string, number]' 타입에는 프로퍼티 '5'(Index 5)가 없다

// Enum, 0부터 시작하여 멤버들의 번호를 매기며 멤버 중 하나의 값을 수동으로 설정해 번호 변경 가능
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

enum Color2 {Red = 1, Green, Blue}
let c2: Color2 = Color2.Green;

enum Color3 {Red = 1, Green = 2, Blue = 4}
let c3: Color3 = Color3.Green;

// 값이 2인 컬러 찾는 방법
enum Color4 {Red = 1, Green, Blue}
let colorName: string = Color4[2];

console.log(colorName); // 값이 2인 'Green'이 출력

// Any, 타입을 알지 못하거나 특정 타입으로 선언하고 싶지 않을 때 | 일부만 알고 전체는 알지 못할 때
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // Boolean 타입으로 변경 가능

let notSure2: any = 4;
notSure.ifItExists(); // 성공, ifItExists 는 런타임엔 존재
notSure.toFixed(); // 성공, toFixed는 존재 (하지만 컴파일러는 검사하지 않음)

let prettySure: Object = 4; // Object를 no-primitive object 대신 사용하지 말 것
prettySure.toFixed(); // 오류: 프로퍼티 'toFixed'는 'Object'에 존재하지 않음

let list3: any[] = [1, true, "free"];

list3[1] = 100; // Index 1의 값을 100으로 변경

// Void, 어떤 타입도 존재할 수 없음을 의미하고 any 타입과 반대
function warnUser(): void {
    console.log("This is my warning message");
}

// Void 타입 변수 선언은 유용하지 않음, null (--strictNullChecks)을 사용하지 않을 때만 해당되기 때문 | undefined만 할당할 수 있기 때문
let unusable: void = undefined;
unusable = null; // Null 값은 Void 타입에 선언 불가

// Null and Undefined, Null 또는 Undefined만 선언 가능
let u: undefined = undefined;
let n: null = null;

// Null, Undefined 타입은 다른 모든 타입의 하위 타입으로 다른 타입에도 할당 가능
// string 또는 null 또는 undefined를 허용하고 싶은 경우 Unions 타입으로 사용
let threeTypes: string | null | undefined

// Never, 절대 발생할 수 없는 타입으로 화살표 함수 표현식에서 항상 오류를 발생시키거나 절대 반환하지 않는 반환 타입으로 사용
// Never 타입은 모든 타입의 하위 타입으로 다른 모든 타입에서 선언이 가능하지만 다른 모든 타입에서 Never 타입 선언을 불가
function error(message: string): never { // never를 반환하는 함수는 함수의 마지막에 도달 불가
    throw new Error(message);
}

function fail() { // 반환 타입이 never로 추론
    return error("Something failed");
}

function infiniteLoop(): never { // never를 반환하는 함수는 함수의 마지막에 도달 불가
    while (true) {
    }
}

// 객체 (Object), 원시 타입이 아닌 타입으로 number, string, boolean, bigint, symbol, null, undefined가 아닌 나머지
// Object.create같은 API가 더 잘 나타나는 장점
declare function create(o: object | null): void;

create({ prop: 0 }); // 성공
create(null); // 성공

// object 타입이기 때문에 불가
create(42); // 오류
create("string"); // 오류
create(false); // 오류
create(undefined); // 오류

// 타입 단언 (Type assertions), 런타임에 영향을 주지 않고 컴파일러에서만 사용하고 싶을 때 | 어떤 특정 검사를 수행하고 싶을 때
// angle-bracket 문법
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as -문법
let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;