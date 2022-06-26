# 타입스크립트 팁

## 오브젝트 필수 아닌 선택자 설정
변수 선언이 필수가 아닌 선택이 되도록 하고 싶다면 사용할 변수 옆에 <b>?</b>를 붙이면 된다. 이는 선택적으로 사용이 가능하도록 하는 것과 동시에 값이 있으면 값을 출력하고 없으면 undefined를 출력하도록 한다.

```
const selectedObject : {
    name: string,
    age?: number
} = {
    name: "이름"
}
```

```
if (selectedObject.age < 10) {}
```

위 처럼 작성할 경우, undefined가 출력될 수 있다는 오류가 발생한다. 이를 보완하기 위해서 selectedObject에 age가 있는지 확인하는 코드를 추가하는 것이 좋다.   

```
if (selectedObject.age && selectedObject.age < 10) {}
```

## Type

중복을 줄이고 더욱 간결하게 작성하는 방법은 다음과 같다.

```
type Objects = {
    name: string,
    age?: number
}

const Player : Objects = {
    name: "이름"
}

const Player2 : Objects = {
    name: "이름",
    age: 12
}
```

물론, 함수로도 쉽게 표현이 가능하다.

```
function playerMaker(name: string) {
    return {
        name
    }
}

const player = playerMaker("플레이어");
```

혹은

```
function playerMaker(name: string) : Objects {
    return {
        name
    }
}

or

ㅡㅡ
const playerMaker = (name: string) : Player => ({name})
ㅡㅡ

const player = playerMaker("플레이어");
player.age = 15;
```

처럼 기존에 선언했던 Objects를 활용해서 string의 name과 number의 age를 사용할 수 있다.

```
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b
```

## readonly
```
type Objects = {
    readonly name: string,
    age?: number
}
```

readonly를 사용하면 수정이 불가하다.

```
const player = playerMaker("플레이어");
player.name = "플레이어수정"
```

위 처럼 이름을 변경하려고 하면 에러가 발생한다. 물론 배열로 선언했을 때도 똑같다.

```
const numbers: readonly number[] = [1, 2, 3, 4]
```

그러나 push는 되지 않지만 filter나 map은 가능하다. 배열을 바꾸는 것이 아니기 때문이다.

## any
```
const a : any[] = [1, 2, 3, 4]
const b : any = true

a + b
```

any는 어떤 타입이든 허용하도록 만든다.   

위에서 선언한 변수들을 합치려고 하면 타입스크립트에서는 에러가 나는게 정상이다. 그러나 위 처럼 any 타입으로 선언하여 타입스크립트의 규정을 벗어나게 만든다면 에러가 나지 않는다. 이는 좋은 방법이 아니다. 그래서 any 타입은 정말로 필요할 때만 사용하게 된다.

## unknown
unknown은 변수 타입을 미리 알지 못할 때를 말한다.

```
const a : unknown;

// 1번
let b = a + 1

// 2번
if (typeof a === "number") {
    let b = a + 1
}
```

만약 unknown으로 변수를 선언했을 때, 1번 처럼 코드를 작성한다면 에러가 발생할 것이다. 1번 처럼 선언한 것은 number 형식이지만 a 변수는 unknown 타입이기 때문이다. 그러나 2번 처럼 typeof으로 조건을 확인하고 조건문 안에서 똑같이 선언한다면 결과는 다르다. 이유는 조건문 범위 내에서는 a를 number 타입으로 인식하기 때문이다.

```
if (typeof a === "string") {
    let b = a.toUpperCase()
}
```

물론 조건문에서 typeof를 string으로 한다면 위 처럼 작성도 가능하다.

## never
```
function hello() : never {
    throw new Error("Error")
}
```

never는 에러를 출력할 때 사용한다. 물론 위 처럼 에러만 출력하도록 할 수 있지만 다르게도 활용이 가능하다.

```
function hello(name: string | number) {
    if (typeof name === "string") {
        // 이 부분에서 name은 string 타입
    } else if (typeof name === "number") {
        // 이 부분에서 name은 number 타입
    } else {
        // 이 부분에서 name은 never 타입
    }
}
```

위 처럼 각 타입에 해당되지 않는 경우, never 타입이 되어 에러를 처리하도록 할 수 있다.

## void
void 타입은 텅 빈 것이라고 이해하면 쉽다.

```
const hello() : void {
    console.log("x")
}
```

void 타입은 return 타입이 없이 오로지 텅 빈 채로 동작한다.   

자주 사용하는 빈도 : void >> unknown >>> never

## overloading
```
type Add = {
    (a: number, b: number) : number // number를 return
    (a: number, b: string) : number
}

const add: Add = (a, b) => a + b
```

overloading은 Add의 ```(a: number, b: number) : number```처럼 콜 시그니처가 많아질 때 자주 사용한다.   

그러나 위 처럼 add 변수를 생성해서 사용하려면 에러가 발생한다. b 변수가 number 일 수도, string 일 수도 있기 때문이다.

```
const add: Add = (a, b) => {
    if (typeof b === "string") return a

    return a + b
}
```

그렇기 때문에 조건을 주어 값을 처리한다.

```
type Add = {
    (a: number, b: number) : number
    (a: number, b: number, c: number) : number
}

const add: Add = (a, b, c?:number) => {
    if (c) return a + b + c
    
    return a + b
}
```

콜 시그니처의 인자의 개수가 다를 때, 선택적 조건(?)을 설정한 다음 사용할 수 있다.

## 다형성
```
type SuperPrint = {
    (arr: number[]): void
    (arr: boolean[]): void
    (arr: string[]): void
}
```

각 타입마다 새로 선언해주는 방법보다

```
type SuperPrint = {
    <TypePlaceholder>(arr: TypePlaceholder[]): TypePlaceholder
}
```

타입을 임의로 주고 사용할 수 있게 만들 수 있다. <b>TypePlaceholder</b>은 내가 정한 이름이기 때문에 각자 사용할 이름으로 작성하여 사용할 수 있다.

```
const superPrint: SuperPrint = (arr) => {
    arr.forEach(i => console.log(i))
}

superPrint([1, 2, 3])
superPrint([true, false, true])
superPrint([1, true, 2, false])
```

임의의 타입을 설정하면 위 처럼 모두 타입을 새로 설정해주지 않아도 사용할 수 있다.

```
function superPrint<T>(a: T[]) {
    return a[0]
}

superPrint([1, 2, 3])
```

함수를 더욱 간결하게 정의할 수 있다.

```
superPrint<number>([1, 2, 3])
```

또한, 사용할 때, 구체적으로 타입을 정의할 수도 있다.

```
type Player<T> = {
    name: string
    info: T
}
```

물론, 타입을 선언할 때도 제네릭 타입을 설정할 수 있다. 이름 옆에 <b><T></b> (이름은 자유이며 대문자로 시작하면 된다.)를 선언하고 사용할 수 있다.

```
const players: Player<{favFood: string}> {
    name: "플레이어",
    info: {
        favFood: "고기"
    }
}
```

예시로 위 처럼 작성해서 사용할 수 있다. 이를 간결하게 나누어서 사용할 수도 있다.

```
type Extra = {
    favFood: string
}

type thisPlayer = Player<Extra>

const players: thisPlayer {
    name: "플레이어",
    info: {
        favFood: "고기"
    }
}
```

다른 사용으로는

```
type A = Array<number>

let a: A = [1, 2, 3, 4]
```

```
function A(arr: Array<number>) {

}
```

만약 React JS의 useState에서 사용하게 된다면

```
const [name, setName] = useState<number>()
```

처럼 사용할 수 있다.

## class
```
class beforeUser {
    constructor {
        private firstName: string,
        private lastName: string,
        private nickName: string
    }
}

abstract class afterUser {
    constructor (
        private firstName: string,
        private lastName: string,
        private nickName: string,
        protected fullName: string
    ) {}

    getFullName() { // private일 경우 바로 호출 불가
        return `${this.lastName} ${this.firstName}`
    }
}

class Player extends afterUser {

}

const me = new Player("이름", "성", "별명")

me.getFullName();
```

일반적으로 클래스를 선언하는 것은 ```beforeUser```와 같다. 그리고 추상적으로 선언이 가능하며 ```afterUser```처럼 사용할 수 있다.   

사용할 변수를 private로 선언한다면 직접 호출해서 사용할 수 없다. 그러나 protected로 선언한다면 같은 내부에서는 호출해 사용이 가능하다.

```
abstract class 추상화 {
    constructor (
        ...
    ) {}

    abstract getNickName(): void

}

class 추상화사용 extends 추상화 {
    getNickName() {
        console.log("추상화 사용")
    }
}
```

추상화 클래스는 직접 인스턴스를 구현하지 못하지만 일반 클래스에 상속하여 사용할 수 있다. 그리고 만약 private로 선언한 변수를 다른 곳에서 사용하고 싶다면 protected로 변경해서 사용할 수 있으며 외부에서 사용하도록 하려면 public으로 선언하여 사용할 수 있다. private는 같은 클래스 내에서만 사용이 가능하다.   

```
type Words = {
    [key:string]: string
}

let dict: Words = {
    "키1": "값1"
    "키2": "값2"
}
```

혹은

```
type Words = {
    [key: number]: string
}

let dict: Words = {
    1: "값1"
    2: "값2"
}
```

처럼 키 값은 어떤 것을 주지 모르겠지만 string 타입 혹은 number 타입이고 값은 string 타입으로 설정할 수 있도록 선언할 수 있다.   

클래스를 선언하는 방법은 다음과 같다.

```
class Dict {
    private words: Words

    constructor() {
        this.words = {}
    }
}
```
```
class Word {
    constructor (
        public term: string,
        public def: string
    ) {}
}
```

## 인터페이스
```
type Team = "red" | "yellow"
type Health = 1 | 5

interface Player {
    nickname: string,
    team: Team,
    health: Health
}

const names: Player = {
    nickname: "me",
    team: "red",
    health: 1
}
```

인터페이스는 오브젝트의 모양을 알려주는 것이 목적이다.

```
interface User {
    name: string
}

interface Player extends User {
    
}

const name: Player = {
    name: "me"
}
```

클래스처럼 상속이 가능하다.

```
interface User {
    firstName: string
}

interface User {
    lastName: string
}

interface User {
    health: number
}

const name: User = {
    firstName: "me",
    lastName: "you,
    health: 10,
}
```

type으로 선언하는 것과 다르게 같은 인터페이스를 여러 번 선언하고 다른 오브젝트를 가져도 사용이 가능하다.   

그리고 추상화 클래스로 선언하면 일반적인 자바스크립트 코드로 사용하게 되는 것처럼 보인다. 즉, 추상화 클래스가 자바스크립트에서 보인다. 그래서 이럴 때, 보이지 않게 하기 위해서 인터페이스를 사용하는 것이 좋다.

```
abstract class afterUser {
    constructor (
        private firstName: string,
        private lastName: string,
        private nickName: string,
        protected fullName: string
    ) {}

    getFullName() { // private일 경우 바로 호출 불가
        return `${this.lastName} ${this.firstName}`
    }
}
```

=>

```
interface afterUser {
    firstName: string,
    lastName: string,
    nickName: string,
    fullName: string,
    getFullName(): string
}

class Player implements User {
    constructor(
        public firstName: string,
        public lastName: string,
    ) {}

    getFullName() {
        return ""
    }
}
```

다만, 상속받는 클래스에서 초기화할 때, private 혹은 protected를 사용할 수 없고 public으로 선언해야 한다.

```
function makeUser(user: User) {
    return "hi"
}

makeUser({
    firstName: "me",
    lastName: "you",
    nickName: "hong",
    fullName: "me you",
    getFullName(name) => "string"
})
```

인자에 인터페이스를 넣어서 사용할 수도 있다. 혹은

```
function makeUser(user: User): User {
    return {
        firstName: "me",
        lastName: "you",
        nickName: "hong",
        fullName: "me you",
        getFullName(name) => "string"
    }
}
```

```
type Animal = {
    name: string
}

type Bear = Animal & {
    honey: boolean
}
```

참고로 type에서 type을 상속받을 때, ```&```를 사용한다.

```
interface Storage {

}
```

```Storage```를 인터페이스로 선언하면 자동으로 ```Web Storage API``` 인터페이스가 된다.