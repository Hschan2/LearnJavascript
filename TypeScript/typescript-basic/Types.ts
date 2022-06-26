// Type

// let lucky = 23;

// lucky = '23'; // lucky가 int형으로 선언되었을 때, 이는 string으로 입력을 받고 있기 때문에 에러

let lucky: any = 23; // type이 any(아무거나)

lucky = '23'; // 타입이 any기 때문에 가능

// Type with Font
type Style = 'bold' | 'italic' | 23;

let font: Style;

// font = 'something';

// Object

interface Person {
    first: string,
    last: string,
    [key: string] : any, // key값은 string, 값은 아무거나
}

const person1: Person = {
    first: 'Jeff',
    last: 'Delaney',
}

const person2: Person = {
    first: 'Usain',
    last: 'Bolt',
    fast: true, // [key: string] : any에 해당
}

// Function

function pow(x: number, y: number): string { // 인자는 string으로 받고 return은 string으로
    return Math.pow(x, y).toString();
}

pow(5, 10);

function pow2(x: number, y: number): void { // 인자는 string으로 받고 return없는 void로
    Math.pow(x, y).toString();
}

pow2(5, 10);

// Array

type MyList = [number?, string?, boolean?]; // 여러 개의 type을 가져옴, ? => ~의 모든 것을 가져온다

const arr: MyList = []; // MyList의 타입으로 배열 선언

arr.push(1);
arr.push('23');
arr.push(false);

// Generic

class Observable<T> { // T에 타입을 넣어 선언하는 클래스
    constructor(public value: T) {
        this.value = value;
    }
}

let x: Observable<number>; // number 타입으로 클래스를 선언

let y: Observable<Person> // Person 타입으로 클래스 선언

let z = new Observable(23); // 값 초기화와 클래스 선언