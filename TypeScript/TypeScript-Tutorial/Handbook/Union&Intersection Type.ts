// 유니언과 교차 타입

// 유니언 타입
/**
 * string이나 number를 매개변수로 기대하는 라이브러리를 사용할 때
 * 문자열을 받고 왼쪽에 "padding"을 추가
 * 만약 'padding'이 문자열이라면, 'padding'은 왼쪽에 추가
 * 만약 'padding'이 숫자라면, 그 숫자만큼의 공백이 왼쪽에 추가
 */
function padLeft(value: string, padding: any) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // "Hello world"를 반환

// 위의 코드는 padding을 any 타입으로 받아 출력값이 어떻든 성공
// 그러나 아래처럼 출력 타입을 string으로 선언했다면 Boolean 타입으로 true는 에러를 발생
declare function padLeft(value: string, padding: any): string;

// 컴파일 타임에는 통과하지만, 런타임에는 오류가 발생합니다.
let indentedString = padLeft("Hello world", true);

// 유니언 타입은 여러 타입 중 하나가 될 수 있을 것이다라는 의미
function padLeft2(value: string, padding: string | number) {
    // ...
}

// padding: string | number이기 때문에 실패, padding: string | number | boolean이라면 성공
let indentedString2 = padLeft2("Hello world", true);

// 공통 필드를 갖는 유니언 (Unions with Common Fields)
// 여러 개의 타입들을 가지고 있지만 사용할 수 있는 것은 한 개
interface Bird {
    fly(): void;
    layEggs(): void;
}
  
interface Fish {
    swim(): void;
    layEggs(): void;
}
  
declare function getSmallPet(): Fish | Bird;
  
let pet = getSmallPet();
pet.layEggs();
  
// 두 개의 잠재적인 타입 중 하나에서만 사용
// pet은 Fish의 layEggs 또는 Bird의 layEggs 중 어떤 것을 사용했는지는 모름
// 그러므로 Bird의 fly 속성을 Fish에서는 찾을 수 없기 때문에 에러
pet.swim();

// 유니언 구별하기 (Discriminating Unions)
type NetworkLoadingState = {
    state: "loading";
  };
  
type NetworkFailedState = {
    state: "failed";
    code: number;
};
  
type NetworkSuccessState = {
    state: "success";
    response: {
      title: string;
      duration: number;
      summary: string;
    };
};
  
// 위 타입들 중 단 하나를 대표하는 타입을 만들었지만,
// 그것이 무엇에 해당하는지 아직 확실하지 않음
// 그러나 각 타입의 state를 가지고 있는 것은 확실
type NetworkState =
    | NetworkLoadingState
    | NetworkFailedState
    | NetworkSuccessState;

// 각 타입의 state을 추측하고 범위를 좁히기 위해 Switch문 사용
type NetworkLoadingState = {
    state: "loading";
};
      
type NetworkFailedState = {
    state: "failed";
    code: number;
};
      
type NetworkSuccessState = {
    state: "success";
    response: {
        title: string;
        duration: number;
        summary: string;
    };
};

type NetworkState =
    | NetworkLoadingState
    | NetworkFailedState
    | NetworkSuccessState;
      
function networkStatus(state: NetworkState): string {
    // 현재 TypeScript는 셋 중 어떤 것이 state가 될 수 있는 잠재적인 타입인지 알 수 없기 때문에 에러
    state.code;
      
    // state에 swtich문을 사용하여, TypeScript는 코드 흐름을 분석하면서 유니언 타입 추측 가능
    switch (state.state) {
        case "loading":
            return "Downloading...";
        case "failed":
        // 여기서 타입은 NetworkFailedState일 것이며,
        // 따라서 `code` 필드에 접근 가능
            return `Error ${state.code} downloading`;
        case "success":
            return `Downloaded ${state.response.title} - ${state.response.summary}`;
    }
}

// 교차 타입 (Intersection Types), 여러 타입을 하나로 결합
// 일관된 에러를 다루는 여러 네트워크 요청이 있다면 해당 에러 핸들링을 분리하여 하나의 응답 타입에 대응하는 결합된 자체 타입으로 생성 가능
interface ErrorHandling {
    success: boolean;
    error?: { message: string };
}
  
interface ArtworksData {
    artworks: { title: string }[];
}
  
interface ArtistsData {
    artists: { name: string }[];
}
  
// 이 인터페이스들은 하나의 에러 핸들링과 자체 데이터로 구성
type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;
  
const handleArtistsResponse = (response: ArtistsResponse) => {
    if (response.error) {
      console.error(response.error.message);
      return;
    }
  
    console.log(response.artists);
};

// 교차를 통한 믹스인 (Mixins via Intersections)
class Person {
    constructor(public name: string) {}
}
  
interface Loggable {
    log(name: string): void;
}
  
class ConsoleLogger implements Loggable {
    log(name: string) {
      console.log(`Hello, I'm ${name}.`);
    }
}
  
// 두 객체를 받아 하나로 결합
function extend<First extends {}, Second extends {}>(
    first: First,
    second: Second
): First & Second {
    const result: Partial<First & Second> = {};
    for (const prop in first) {
        if (first.hasOwnProperty(prop)) {
            (result as First)[prop] = first[prop];
        }
    }
    for (const prop in second) {
        if (second.hasOwnProperty(prop)) {
            (result as Second)[prop] = second[prop];
        }
    }
    return result as First & Second;
}
  
const jim = extend(new Person("Jim"), ConsoleLogger.prototype);
jim.log(jim.name);