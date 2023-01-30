// 열거형 (Enums), 상수들의 집합

// 숫자 열거형 (Numeric enums)
enum Direction {
    Up = 1, // 숫자로 초기화, 뒤에 멤버들은 자동으로 1씩 증가된 값을 가짐
    Down, // 2
    Left, // 3
    Right, // 4
}

// 초기화 하지 않아도 가능
enum Direction {
    Up, // 0
    Down, // 1
    Left, // 2
    Right, // 3
}

// 사용 예제
enum Response {
    No = 0,
    Yes = 1,
}

function respond(recipient: string, message: Response): void {
    // ...
}

respond("Princess Caroline", Response.Yes)

// 숫자 열거형은 계산된 멤버와 상수 멤버를 섞어서 사용 가능
// 초기화되지 않은 열거형이 먼저 나오거나 숫자 상수, 다른 상수 열거형 멤버화 함께 초기화된 숫자 열거형 이후 선언할 것
enum E {
    A = getSomeValue(),
    B, // 오류! 앞에 나온 A가 계산된 멤버이므로 초기화가 필요
}

// 문자열 열거형 (String enums), 멤버들의 문자열 리터럴 또는 다른 문자열 열거형 멤버로 상수 초기화 필요
// 숫자형과 달리 자동 증가 기능은 없으며 직렬화라는 장점 존재
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

// 이종 열거형 (Heterogeneous enums), 숫자 + 문자열 => 사용 권장하지 않음
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}

// 계산된 멤버와 상수 멤버 (Computed and constant members)
// 열거형 멤버들은 상수이거나 계산된 값
enum E { X } // E.X는 상수. 초기화가 없는 경우 값은 0으로 할당

enum E1 { X, Y, Z } // 'E1' 과 'E2' 의 모든 열거형 멤버는 상수. 초기화 값이 없으며 숫자 상수로 초기화된 열거형 멤버 뒤에 따라오면 앞에 나온 상수 값에 +1
enum E2 {
    A = 1, B, C
}

enum FileAccess {
    // 상수 멤버
    None, // 기본적인 리터렬 열거형 표현식. 문자 또는 숫자
    Read = 1 << 1, // 상수 열거형 표현식으로 이중 연산자 사용
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // 계산된 멤버
    G = "123".length
    // 상수 열거형 표현식 값이 NaN이거나 Infinity라면 컴파일 오류 발생
}

// 유니언 열거형과 열거형 멤버 타입 (Union enums and enum member types)
// 열거형을 타입처럼 사용 가능
enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}

let c: Circle = {
    kind: ShapeKind.Square, // 오류! 'ShapeKind.Circle' 타입에 'ShapeKind.Square' 타입을 할당 불가
    radius: 100,
}

// 유니언 (|, &)을 활용한 경우 열거형 자체에 존재하는 정확한 값의 집합을 알고 있다는 전재를 알 것
enum E {
    Foo,
    Bar,
}

function f(x: E) {
    if (x !== E.Foo || x !== E.Bar) {
        //             ~~~~~~~~~~~
        // 에러! E 타입은 Foo, Bar 둘 중 하나이기 때문에 이 조건은 항상 true를 반환
        // E의 Foo일 수도, E의 Bar일 수도
    }
}

// 런타임에서 열거형 (Enums at runtime), 열거형은 런타임에 존재하는 실제 객체
enum E {
    X, Y, Z
}

function f(obj: { X: number }) {
    return obj.X;
}

// E가 X라는 숫자 프로퍼티를 가지고 있기 때문에 동작하는 코드
f(E);

// 컴파일 시점에서 열거형 (Enums at compile time)
// keyof 키워드는 일반적인 객체에 기대하는 동작과 다른 동작, keyof typeof를 사용하면 모든 열거형의 키를 문자열로 나타내는 타입 Get
enum LogLevel {
    ERROR, WARN, INFO, DEBUG
}

/**
 * 이것은 아래와 동일. :
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
    const num = LogLevel[key];
    if (num <= LogLevel.WARN) {
       console.log('Log level key is: ', key);
       console.log('Log level value is: ', num);
       console.log('Log level message is: ', message);
    }
}
printImportant('ERROR', 'This is a message');

// 역 매핑 (Reverse mappings)
// 열거형 값에서 열거형 이름으로 역 매핑
enum Enum {
    A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"

// 타입스크립트에서 역 매핑 컴파일 과정, name->value 정방향 매핑과 value->name 역방향 매핑의 두 정보를 모두 저장하는 객체로 컴파일
// 다른 열거형 멤버 참조는 항상 프로퍼티 접근으로 노출로 인라인 X
// 문자열 열거형은 역 매핑을 생성하지 않음
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[a]; // "A"

// const 열거형 (const enums), 추가로 생성된 코드 및 추가적인 간접 참조에 대한 비용을 피하기 위한 것
const enum Enum {
    A = 1,
    B = A * 2
}

// const 열거형은 상수 열거형 표현식만 사용 가능. 컴파일 과정에서 완전히 제거되며 사용하는 공간에 인라인 => 계산된 멤버를 가지고 있지 않기 때문에 가능
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

// 위의 const 열거형의 컴파일
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

// Ambient 열거형 (Ambient enums), 이미 존재하는 열거형 타입을 묘사하기 위한 것
// 다른 열거형 타입과 차이점은 초기화되지 않은 멤버들은 항상 계산된 멤버로 간주
declare enum Enum {
    A = 1,
    B,
    C = 2
}
