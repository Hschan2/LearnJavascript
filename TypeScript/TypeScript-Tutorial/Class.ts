// 클래스 (Classes)

// 기본 사용법
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");

// 상속 (Inheritance), 객체-지향 패턴 사용 가능
// Animal을 상속받아 사용하는 Dog 클래스 예제
class Animal {
    move(distanceInMeters: number = 0) { // number 0으로 초기화
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

// bark와 move 사용 가능
class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

// 위의 예제를 더욱 복잡하고 심화된 예제
// Snake와 Horse는 Animal의 move 메서드를 오버라이드해서 각 클래스 특성에 맞는 기능을 가진 move 생성
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); } // super로 부모 클래스로 name 넘겨 받음
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
/**
Slithering...
Sammy the Python moved 5m.
Galloping...
Tommy the Palomino moved 34m.
 */

// Public, private 그리고 protected 지정자 (Public, private, and protected modifiers)
// 기본적으로 공개 (Public by default), 모두 공개
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

// ECMAScript 비공개 필드 (ECMAScript Private Fields)
// #은 private로 비공개
class Animal {
    #name: string;
    constructor(theName: string) { this.#name = theName; }
}

new Animal("Cat").#name; // 프로퍼티 '#name'은 비공개 식별자이기 때문에 'Animal' 클래스 외부에선 접근 불가

// TypeScript의 private 이해하기 (Understanding TypeScript’s private)
// #으로 선언된 것처럼 private로 선언되면 비공개
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 오류: 'name'은 비공개

// 두 개의 타입을 비교할 때, 둘 중 하나가 private일 경우 다른 하나도 private. protected도 동일
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino; // Animal과 Rhino는 상속받기 때문에 private 부분 공유 호환 가능
animal = employee; // 오류: 'Animal'과 'Employee'은 각각의 클래스이기 때문에 호환될 수 없음.

// protected 이해하기 (Understanding protected)
// 파생된 클래스 내에서 접근할 수 있다는 점만 제외하면 private와 비슷
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 오류. Employee 내부에서는 사용 가능

// 생성자도 protected로 선언 가능
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee는 Person을 확장할 수 있습니다.
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 오류: 'Person'의 생성자는 protected

// 읽기전용 지정자 (Readonly modifier)
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs"); // 읽기전용은 처음에만 값 선언 가능
dad.name = "Man with the 3-piece suit"; // 오류! name은 읽기전용으로 값 변경 불가

// 매개변수 프로퍼티 (Parameter properties)
// private을 사용하면 비공개로 선언하고 초기화 (public, protected, readonly도 동일)
// 위의 Octopus에서 읽기전용 name과 생성자 매개변수 theName를 한 곳에서 멤버를 만들고 초기화하도록 수정
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) { // 선언과 할당을 초기화
    }
}

// 접근자 (Accessors), Getter/Setter
// Getter/Setter가 없이 데이터를 가져와 사용한다면
class Employee {
    fullName: string;
}

// fullName을 직접 설정하도록 허용하여 편리하지만 몇 가지 제약 조건이 적용될 때는 부적절
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}

// 특정 조건을 주고 난 후에 데이터를 가져오고 싶다면
const fullNameMaxLength = 10;

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (newName && newName.length > fullNameMaxLength) {
            throw new Error("fullName has a max length of " + fullNameMaxLength);
        }

        this._fullName = newName;
    }
}

// 주의할 점. get과 set이 없는 접근자는 자동으로 readonly로 적용 => 프로퍼티 내 사용자들이 변경할 수 없음을 알기 때문에 코드에서 .d.ts 파일을 생성할 때 유용
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}

// 전역 프로퍼티 (Static Properties)
class Grid {
    static origin = {x: 0, y: 0}; // 한 번만 선언
    calculateDistanceFromOrigin(point: { x: number; y: number; }) {
        // static을 사용함으로써 앞에 this.을 붙이는 것과 같이 Grid.을 붙여 사용
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0); // 1x scale
let grid2 = new Grid(5.0); // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));

// 추상 클래스 (Abstract Classes), 다른 클래스들이 파생될 수 있는 클래스며 직접 인스턴스화 불가
// 이는 인터페이스와 달리 멤버 구현 세부 정보 포함 가능. 즉, 메소드에 내용 추가 가능
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log("roaming the earth...");
    }
}

// 추상 메소드는 abstract 키워드를 포함해야 하며 선택적 접근 지정자 포함 가능
// 구현은 아닌 내용 추가
abstract class Department {
    constructor(public name: string) {
    }

    printName(): void {
        console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // 반드시 파생된 클래스에서 구현 필수. 즉, Department를 사용하는 클래스는 해당 메소드 선언 필수
}

class AccountingDepartment extends Department {

    constructor() {
        super("Accounting and Auditing"); // 파생된 클래스의 생성자는 반드시 super()를 호출
    }

    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
        console.log("Generating accounting reports...");
    }
}

let department: Department; // 추상 타입의 레퍼런스를 생성
department = new Department(); // 오류: 추상 클래스는 인스턴스화 불가
department = new AccountingDepartment(); // 추상이 아닌 하위 클래스를 생성하고 할당
department.printName();
department.printMeeting();
department.generateReports(); // 오류: 선언된 추상 타입에 메서드가 존재하지 않음. 즉, 추상 클래스에 해당 메소드가 없음

// 고급 기법 (Advanced Techniques)
// 생성자 함수 (Constructor functions)
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter: Greeter; // Greeter 클래스의 인스턴스 타입으로 사용
greeter = new Greeter("world"); // 생성자 함수로써 사용. new를 사용하며 매개변수 선언
console.log(greeter.greet()); // "Hello, world""

//위의 예제를 뜯어서 구체적으로 확인할 때
let Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();

let greeter; // 생성자 함수 할당
greeter = new Greeter("world"); // 생성자 함수 호출. 이 때 클래스의 인스턴스 Get
console.log(greeter.greet()); // "Hello, world"

// 위의 예제와 다른 예제
class Greeter {
    static standardGreeting = "Hello, there"; // 한 번만 선언해 사용
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

// greeter1은 위의 예제와 비슷하게 작동 => Greeter 클래스를 인스턴스화하고 객체 사용
let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet()); // "Hello, there"

// 아래는 클래스를 직접 사용하는 방법으로 클래스 자체를 유지하거나 생성자 함수를 다르게 설명 가능
// typeof를 사용해서 인스턴스 타입이 아닌 Greeter 클래스 자체를 *타입으로 제공(사용)* => 인스턴스 타입이 아닌 Greeter라는 심볼 타입을 제공
// Greeter 클래스의 인스턴스를 만드는 생성자와 함께 모든 정적 멤버를 포함
let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

// 아래는 클래스 자체를 타입으로 사용하는 greeterMaker를 new로 선언해 사용함으로써 새로운 Greeter 인스턴스를 생성하고 이전처럼 호출
let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet()); // "Hey there!"

// 인터페이스로써 클래스 사용하기 (Using a class as an interface)
// 클래스는 타입을 생성하기 때문에 인터페이스를 사용할 수 있는 동일한 위치에서 사용
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};