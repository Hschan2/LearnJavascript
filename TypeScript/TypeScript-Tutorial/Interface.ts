// 인터페이스

// 인터페이스 동작 과정
// printLabel 호출 확인 => String 타입의 label을 갖는 객체를 하나의 매개변수
function printLabel(labeledObj: { label: string }) {
    console.log(labeledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

// 위의 방법을 Interface를 추가해서 사용한다면, label을 인터페이스에서 선언 후 외부에서 사용
interface LabeledValue {
    label: string;
}

function printLabel2(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

let myObj2 = {size: 10, label: "Size 10 Object"};
printLabel2(myObj);

// 선택적 프로퍼티 (Optional Properties)
// 인터페이스의 모든 프로퍼티가 필요하지 않음
interface SquareConfig {
    color?: string; // Option bags 패턴, 존재가 필수가 아닐 경우
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({ color: "black" });

// 만약 오타가 발생한다면? SquareConfig에서 선언된 것 중에 clor이 없다는 에러 출력
if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
}

// 읽기전용 프로퍼티 (Readonly properties), 객체가 처음 생성될 때만 수정이 가능하도록 할 때
interface Point {
    readonly x: number;
    readonly y: number;
}

// 만약 처음 생성될 때 선언하고 이 후 값을 수정하고자 한다면? 에러 발생
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // 오류!

// 배열 번전의 읽기 전용도 생성이 가능
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // 오류!
ro.push(5); // 오류!
ro.length = 100; // 오류!
a = ro; // 오류!

// 그러나 읽기 전용이 아닌 기본 배열로 타입 단언으로 오버라이드 하는 것은 가능
a = ro as number[];

// readonly vs const, 변수는 const를 프로퍼티는 readonly

// 초과 프로퍼티 검사 (Excess Property Checks)
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

// color를 colour로 사용하여 에러
let mySquare = createSquare({ colour: "red", width: 100 });

// 만약 기존 프로퍼티에서 없는 것을 사용하고 싶다면? 타입 단언으로 오버라이드해서 사용
// opacity를 타입 단언으로 생성해 사용
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

// 만약 추가 프로퍼티가 있을 예정임을 미리 알고 있다면?
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

// 위 처럼 인터페이스를 선언하고 객체를 다른 변수에 할당한다면 추가 프로퍼티 검사를 받지 않아 컴파일러 에러가 발생하지 않음
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);

let squareOptions = { colour: "red" };
let mySquare = createSquare(squareOptions);

// 함수 타입 (Function Types)
interface SearchFunc {
    (source: string, subString: string): boolean; // 매개변수는 이름과 타입 선언 필수
}

// 실제로 사용하게 된다면 아래처럼 사용, 아래 function()의 매개변수 source, subString은 다르게 작성해도 가능
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}

// 만약 함수 매개변수에 타입을 지정하고 싶지 않을 경우 인터페이스에서 지정한 매개변수 순서대로 대응
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}

// 만약 인터페이스에서 선언된 타입이 다를 경우, 에러가 발생
let mySearch: SearchFunc;

// return은 인터페이스에서 선언한 것처럼 boolean 타입, 아래는 string 타입이기 때문에 에러
mySearch = function(src, sub) {
  let result = src.search(sub);
  return "string";
};

// 인덱서블 타입 (Indexable Types), 타입을 인덱스로 기술
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

// 배열의 0번째 인덱스 가져오기, Bob
let myStr: string = myArray[0];

// 인덱스 서명을 지원하는 타입은 문자열과 숫자
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 오류: 숫자형 문자열로 인덱싱을 하면 완전히 다른 타입(문자열)의 Animal이기 때문에 에러
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}

// 인덱스의 반환 타입이 다를 경우 에러
interface NumberDictionary {
    [index: string]: number;
    length: number;    // 성공, length는 숫자 타입
    name: string;      // 오류, `name`의 타입은 인덱서의 하위타입(숫자)이 아닌 문자열 타입
}

// 그러나 프로퍼티 타입들의 합집합일 경우 위의 문제 해결
interface NumberOrStringDictionary {
    [index: string]: number | string; // 숫자거나 문자열이거나
    length: number;    // 성공, length는 숫자
    name: string;      // 성공, name은 문자열
}

// 인덱스 할당을 막기 위해 인덱스 시그니처를 읽기 전용으로 선언 가능
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // 오류! 읽기 전용이기 때문에

// 클래스 타입 (Class Types)
// 인터페이스 구현하기 (Implementing an interface)
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    constructor(h: number, m: number) { }
}

// setTime처럼 클래스에 구현된 메서드를 인터페이스에서도 기술 가능
// 인터페이스는 클래스의 public과 private 모두보다 public으로 기술
// 클래스 인스턴스의 private에서는 특정 타입 존재 여부 검사 불가
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}

// 클래스의 스태틱과 인스턴스의 차이점 (Difference between the static and instance sides of classes)
interface ClockConstructor {
    new (hour: number, minute: number);
}

// new (hour: number, minute: number)와 일치하지 않기 때문에 에러
// 인터페이스에서 return 타입이 없고 생성자가 스태틱이기 때문에
// 클래스가 인터페이스를 implements를 할 때 클래스의 인스턴스만 검사하기 때문에
class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}

// 아래처럼 생성자 인터페이스, 인스턴스 메서도를 정의하는 인터페이스 선언하고 선언된 타입의 인스턴스를 생성하는 함수를 생성하는 등처럼 사용한다면 위의 문제 해결
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 위의 과정을 더 쉽게 작성한다면
interface ClockConstructor {
    new (hour: number, minute: number);
}
  
  interface ClockInterface {
    tick();
}
  
  const Clock: ClockConstructor = class Clock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("beep beep");
    }
}

// 인터페이스 확장하기 (Extending Interfaces)
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

// 타입 단언으로 받아서 사용 가능
let square = {} as Square;
square.color = "blue";
square.sideLength = 10;

// 인터페이스는 여러 인터페이스를 확장 가능
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

// 하이브리드 타입 (Hybrid Types), 여러 타입의 조합으로 동작하는 객체 생성 가능
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = (function (start: number) { }) as Counter;
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 클래스를 확장한 인터페이스 (Interfaces Extending Classes)
// 인터페이스가 클래스를 확장하면 클래스의 멤버는 상속받지만 구현은 상속 불가 => 인터페이스가 구현을 제공하지 않고 클래스의 멤버 모두가 선언한 것과 같음
// 인터페이스는 클래스의 private, protected 멤버도 상속 가능 => private, protected 멤버를 포함한 클래스 확장이 가능하며 인터페이스는 해당 클래스나 하위클래스에 의해서만 구현 가능
// 많은 상속계층을 가지고 있거나 특정 프로퍼티를 가진 하위클래스에서만 코드가 동작하도록 지정할 때 유용
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// Control을 상속받지 못해 private의 state가 없기 때문
class Image2 implements SelectableControl {
    private state: any;
    select() { }
}

// state, select 사용 불가, 상속받지 못했기 때문
class Location2 {

}

// 위의 예제에서 SelectableControl은 Control의 private 프로퍼티를 포함한 모든 멤버를 가지게 되고 SelectableControl를 구현하는 것은 Control의 자식만 가능
// Control의 자식만 같은 선언의 private 멤버를 가질 수 있기 때문, private 멤버들이 호환되기 위해 필요
// Control 클래스 안에서 SelectableControl의 인스턴스를 통해 private 멤버에 접근 가능