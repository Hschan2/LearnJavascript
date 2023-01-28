// 함수 (Function)

// 기존 함수 활용
function add(x, y) {
    return x + y;
}

let myAdd = function (x, y) { return x + y };

let z = 100;

function addToZ(x, y) {
    return x + y + z;
}

// 함수 타입 (Function Types)
// 함수의 타이핑 (Typing the function), 기존 함수에 타입만 추가해 선언
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function (x: number, y: number): number { return x + y };

// 함수 타입 작성하기 (Writing the function type)
let myAdd: (x: number, y: number) => number =
    function (x: number, y: number): number { return x + y; };
    
// 위의 코드를 가독성을 높이기 위해 작성한다면, 매개변수의 타입들이 올바르게 나열되어 있다면
// 만약 함수가 값을 반환하지 않는다면 void로 선언
let myAdd: (baseValue: number, increment: number) => number =
    function (x: number, y: number): number { return x + y; };
    
// 타입의 추론 (Inferring the types)
// 전체 함수 타입 가짐
let myAdd = function(x: number, y: number): number { return  x + y; };

// 매개변수 x와 y는 number 타입
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };

// 선택적 매개변수와 기본 매개변수 (Optional and Default Parameter)
// 함수에 주어진 인자의 수는 함수의 매개변수의 수가 일치 필요
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // 오류, 너무 적은 매개변수
let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams");         // 정확함

// lastName은 값이 있으면 string 없으면 undefined로 필수 입력 매개변수가 아님
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");                  // 지금은 바르게 동작
let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams");         // 정확함

// firstName만 필수 입력해야 할 선택적 매개변수, lastName은 값이 없으면 Smith로
// 모든 필수 매개변수 뒤에 오는 기본-초기화 매개변수는 선택적으로 처리되고 선택적 변수와 마찬가지로 해당 함수를 호출할 때 생략 가능 => 기본 매개변수의 타입들이 공통성을 공유
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // 올바르게 동작, "Bob Smith" 반환
let result2 = buildName("Bob", undefined);       // 여전히 동작, 역시 "Bob Smith" 반환
let result3 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
let result4 = buildName("Bob", "Adams");         // 정확함

// 아래의 두 함수는 공통된 타입을 공유하는 것을 의미
function buildName(firstName: string, lastName?: string) {
    // ...
}

function buildName(firstName: string, lastName = "Smith") {
    // ...
}

// 위와 반대로 firstName을 초기화 매개변수로 사용 가능
// 그러나 기본-초기화 매개변수가 필수 매개변수보다 앞에 오게 된다면 사용자가 명시적으로 undefined 전달 필요
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // 오류, 너무 적은 매개변수
let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams");         // 성공, "Bob Adams" 반환
let result4 = buildName(undefined, "Adams");     // 성공, "Will Adams" 반환

// 나머지 매개변수 (Rest Parameters), 다수의 매개변수를 그룹지어 전달하기 원할 때
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

// firstName에는 Joseph, ...restOfName에는 나머지 세 개의 매개변수가 전달되어 "Joseph Samuel Lucas MacKinzie"
// 나머지 매개변수는 무한으로 취급되어 원하는 만큼 전달이 가능
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");


function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;

// this
// this와 화살표 함수 (this and arrow functions)
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            // 아래의 this는 deck의 객체가 아닌 window를 가리키기 때문에 에러 발생 => 바인딩 필요
            // 이 문제는 cardPicker()의 자체적인 호출때문에 발생
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// 일반 함수로 호출하는 방법에서 화살표 함수로 변경하면 this를 바인딩하여 사용 가능
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        // 여기
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            // 여기의 this는 any 타입 => this가 객체 리터럴 내부의 함수에서 나왔기 때문
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// this 매개변수 (this parameter)
// this에 any 타입을 주는 일을 고치기 위해 명시적으로 this 매개변수 전달 가능
function f(this: void) {
    // 독립형 함수에서 `this`를 사용할 수 없음
}

// 위의 예시를 활용한 코드
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    // 여기서 this를 Deck 타입으로 선언
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: 아래 함수는 이제 callee가 반드시 Deck 타입이어야 함을 명시적으로 지정합니다.
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// 콜백에서 this 매개변수 (this parameters in callbacks)
// 나중에 호출할 콜백 함수를 전달할 때 this로 인해 문제 발생 가능성 존재
// 해당 문제를 해결하기 위해 this 매개변수를 콜백 오류를 막기 위해 타입 표시
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
        // 여기서의 this는 이 콜백을 쓰면 런타임에서 충돌 발생, this 타입을 요구하지 않는 함수로 예상되기 때문
        this.info = e.message;
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // 오류!

// this를 표시한 상태에서 onClick이 Handler의 인스턴스로써 호출되어야함을 명시 필요
// this를 void를 갖는 함수를 필요로 한다는 것을 전달
class Handler {
    info: string;
    onClickGood(this: void, e: Event) {
        // void 타입이기 때문에 this는 이곳에서 쓸 수 없습니다!
        console.log('clicked!');
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickGood);

// 만약 this 타입을 void로 선언해 this.info를 사용하지 못하는 것이 아닌 this.info를 사용하고 싶다면
// this를 void로 선언한 것을 지우고 사용하고 화살표 함수를 사용
// 화살표 함수가 외부의 this를 사용하기 때문에 가능하고 this가 void 타입일 것으로 예상된다면 전달에 문제 없음
// 단점은 Handler 타입 객체마다 하나의 화살표 함수가 필요
class Handler {
    info: string;
    onClickGood = (e: Event) => { this.info = e.message }
}

// 오버로드 (Overloads)
// 사용자가 전달하는 것에 따라 다른 결과를 반환하는 함수
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
    // 인자가 배열 또는 객체인지 확인
    // 만약 그렇다면, deck이 주어지고 card를 선택
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // 그렇지 않다면 그냥 card를 선택
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// 만약 위의 동일한 함수에서 다중 함수 타입을 제공하도록 만들기 위해서는?
let suits = ["hearts", "spades", "clubs", "diamonds"];

// 다중 함수 타입을 위한 오버로드 선언
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // 인자가 배열 또는 객체인지 확인
    // 만약 그렇다면, deck이 주어지고 card를 선택
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // 그렇지 않다면 그냥 card를 선택
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// 위의 예제에서 function pickCard(x): any {}는 오버로드에 해당되지 않음
// 두 가지 오버로드만을 가지며 객체를 받는 것 하나와 숫자를 받는 것 하나. 다른 매개변수 타입으로 pickCard를 호출하는 것은 오류가 발생