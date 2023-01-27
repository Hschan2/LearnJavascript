// 타입 추론
let helloWorld = "Hello World" // string

// 타입 정의
interface User {
    name: string;
    id: number;
}

// interface의 형태를 따라 선언
const user: User = {
    name: "Hayes",
    id: 0
}

// 클래스 또한 인터페이스와 같은 선언
class UserAccount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}

const user2: User = new UserAccount("Murphy", 1);

// 인터페이스는 함수에서 매개변수와 리턴 값을 명시하는데 사용
function getAdminUser(): User {
    const user = {
        name: "type",
        id: 1
    }
    // return 필수
    return user
}

function deleteUser(user: User) {
    const userId = user.id;
    const userName = user.name
    // ... user는 인터페이스 User 형태에 맞게 선언
}

// 타입 구성
// 유니언(Unions)
type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

// 함수에서도 사용 가능 (array, string 등)
function getLength(obj: string | string[]) {
    return obj.length;
}

function wrapInArray(obj: string | string[]) {
    if (typeof obj === "string") {
      return [obj];
    } else {
      return obj;
    }
}

// 제네릭(Generics)
// 특정 타입의 배열 선언
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
  }

// const backpack: Backpack<string>, Backpack 타입을 문자열로
declare const backpack: Backpack<string>;

// 위에서 Backpack의 변수를 문자열로 선언했기 때문에 object는 string이다
const object = backpack.get();

// backpack 변수가 string이므로, add 함수에 number를 전달할 수 없다.
backpack.add(23);

// 구조적 타입 시스템(Structural Type System)
interface Point {
    x: number;
    y: number;
}

// p는 Point 형태를 받는다
function printPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}

  
const point = { x: 12, y: 26 };
printPoint(point); // "12, 26"를 출력합니다

// 형태 일치에는 일치시킬 객체의 필드의 하위 집합만 필요
const point3 = { x: 12, y: 26, z: 89 };
printPoint(point3); // prints "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
printPoint(rect); // prints "33, 3"

const color = { hex: "#187ABF" };

// color의 hex는 Point 형태에 속해있지 않기 때문에 에러

// 구조적으로 클래스와 객체가 형태를 따르는 방법은 차이가 없다
class VirtualPoint {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
  
const newVPoint = new VirtualPoint(13, 56);
printPoint(newVPoint); // prints "13, 56"