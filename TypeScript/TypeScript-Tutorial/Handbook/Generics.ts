// 제네릭(Generics), 단일 타입이 아닌 다양한 타입에서 작동하는 재사용 컴포넌트 작성

// 제네릭의 Hello World (Hello World of Generics)
function identity(arg: number): number { // 제네릭이 없다면 특정 타입 설정
    return arg;
}

function identity(arg: any): any { // 또는 any 타입으로 아무거나
    return arg;
}

// any 타입은 실제로 함수가 반환할 때 어떤 타입인지 알 수 없음 => 제네릭 사용으로 보완
function identity<T>(arg: T): T { // 넘겨받은 타입으로 설정. any 타입보다 더욱 정확한 타입 설정 가능
    return arg;
}

let output = identity<string>("myString"); // 출력 타입은 'string'

// 타입을 설정하지 않고 '타입 인수 추론'으로 사용 가능
let output = identity("myString"); //출력 타입은 'string'. "myString"으로 string 타입으로 추론

// 제네릭 타입 변수 작업 (Working with Generic Type Variables)
function identity<T>(arg: T): T { // 함수에 제네릭 타입화된 매개변수를 쓰도록 강요
    return arg;
}
  
// 만약 매개변수의 길이를 확인한다면? 매개변수가 실제로 length를 사용할 수 있는지 확인할 수 없기 때문에 에러
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length); // 오류: T에는 .length 가 없음
    return arg;
}

// 배열화 한다면 길이 확인 가능. 배열은 길이를 가지고 있기 때문
function loggingIdentity<T>(arg: T[]): T[] { // 배열은 특정 타입을 얻기 때문에 유연성 획득
    console.log(arg.length); // 배열은 .length를 가지고 있습니다. 따라서 오류는 없습니다.
    return arg;
}
  
// 제네릭 타입 (Generic Types)
// 제네릭 함수 타입은 함수 선언과 비슷하게 타입 매개변수가 먼저 나열되는 비-제네릭 함수 타입과 비슷
function identity<T>(arg: T): T {
    return arg;
}
  
let myIdentity: <T>(arg: T) => T = identity;
  
// 타입 변수의 수와 타입 변수가 사용되는 방식에 따라 타입의 제네릭 타입 매개변수에 다른 이름 사용 가능
function identity<T>(arg: T): T {
    return arg;
}
  
let myIdentity: <U>(arg: U) => U = identity; // T를 U로

// 제네릭 타입을 객체 리터럴 타입의 함수 호출 시그니처로 작성 가능
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: { <T>(arg: T): T } = identity;

// 인터페이스로 구현 가능
interface GenericIdentityFn {
    <T>(arg: T): T;
}
  
  function identity<T>(arg: T): T {
    return arg;
}
  
let myIdentity: GenericIdentityFn = identity;

// 전체 인터페이스의 매개변수로 옮기고 싶을 때는 아래처럼 작성할 수 있으며 이는 제네릭 타입을 확인 가능
interface GenericIdentityFn<T> {
    (arg: T): T;
}
  
function identity<T>(arg: T): T {
    return arg;
}
  
let myIdentity: GenericIdentityFn<number> = identity; // 타입 확인 가능

// 제네릭 클래스 (Generic Classes), 제네릭 인터페이스와 비슷한 형태
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

// number 타입뿐만 아니라 string 타입 등 다른 타입도 가능
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

/**
 * 클래스 자체에 타입 매개변수를 넣으면 클래스의 모든 프로퍼티가 동일한 타입으로 동작
 * 제네릭 클래스는 정적 측면이 아닌 인스턴스 측면이므로 정적 멤버는 클래스의 타입 매개변수 사용 불가
 */

// 제네릭 제약조건 (Generic Constraints), 특정 타입들로만 동작하는 제네릭 함수 생성 가능
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // 오류: T에는 .length가 없음
    return arg;
}

// 제약조건을 명시하는 인터페이스를 만듦으로써 위의 문제를 보완
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T { // 인터페이스를 받아서 확장해 사용
    console.log(arg.length);  // 이제 .length 프로퍼티(number)가 있는 것을 알기 때문에 더 이상 오류 X
    return arg;
}

// 그러나 위의 제네릭 함수를 사용한다면?
loggingIdentity(3);  // 오류, number는 .length 프로퍼티가 없음
loggingIdentity({ length: 10, value: 3 }); // 필요한 프로퍼티들이 있는 타입의 값을 전달

// 제네릭 제약조건에서 타입 매개변수 사용 (Using Type Parameters in Generic Constraints)
// 다른 타입 매개변수로 제한된 타입 매개변수 선언 가능하며 이름이 있는 객체에서 프로퍼티를 가져오고 싶을 때 활용 가능
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // 성공
getProperty(x, "m"); // 오류: 인수의 타입 'm' 은 'a' | 'b' | 'c' | 'd'에 해당되지 않음

// 제네릭에서 클래스 타입 사용 (Using Class Types in Generics), 팩토리를 생성할 때 생성자 함수로 클래스 타입을 참조
function create<T>(c: {new(): T; }): T {
    return new c();
}

// 프로토타입 프로퍼티를 사용해 생성자 함수와 클래스 타입의 인스턴스 사이의 관계를 유추하고 제한
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nameTag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nameTag; // 타입검사!
createInstance(Bee).keeper.hasMask; // 타입검사!