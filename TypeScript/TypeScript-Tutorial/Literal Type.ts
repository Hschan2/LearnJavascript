// 리터럴 타입 (Literal Type), 집합 타입보다 더욱 구체적인 하위 타입

// 리터럴 타입 좁히기 (Literal Narrowing), 무한한 수의 잠재적 케이스들 (문자열 값은 경우의 수가 무한대)을 유한한 수의 잠재적 케이스 (helloWorld의 경우: 1개)로 줄여나가는 것
// const를 사용하여 변수 helloWorld가 절대 변경되지 않음을 보장
// 따라서, TypeScript는 문자열이 아닌 "Hello World"로 타입 설정
const helloWorld = "Hello World";
// 반면, let은 변경될 수 있으므로 컴파일러는 문자열이라고 선언
let hiWorld = "Hi World";

// 문자열 리터럴 타입 (String Literal Types), Union | Type Guard | 타입 별칭과 결합, 문자열로 enum과 비슷한 형태 가능
type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === "ease-out") {
    } else if (easing === "ease-in-out") {
    } else {
      // 하지만 누군가가 타입을 무시하게 된다면
      // 이곳에 도달하게 가능
    }
  }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // "ease-in" | "ease-out" | "ease-in-out"에 해당되지 않기 때문에 에러

// 문자열 리터럴 타입은 오버로드를 구별하는 것과 동일한 방법으로 사용 가능
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... 추가적인 중복 정의들 ...
function createElement(tagName: string): Element {
  // ... 여기에 로직 추가 ...
}

// 숫자형 리터럴 타입 (Numeric Literal Types)
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
    return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}
  
const result = rollDice();

// 숫자형 리터럴 타입은 설정값 설명할 때 주로 사용
/** loc/lat 좌표에 지도를 생성 */
declare function setupMap(config: MapConfig): void;
// ---생략---
interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32; // 여기
}

setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });