function Compare() {
    const number = 5;
    const string = "5";
    
    if (number === string) return "Hi";
    else if (number > string) return "Hi, Number";
    else if (number < string) return "Hi, String";
    else return "Bye";
}

console.log(Compare()); // "Bye"

/**
 * 위의 함수의 결과가 "Bye"가 나오는 이유
 * 1. === 연산자는 값과 타입을 모두 비교하는 엄격한 비교를 수행하기 때문에 숫자 타입 5와 문자열 타입 "5"을 비교하고, 이는 서로 타입이 다르기 때문에 False
 * 2. else if (a > b)와 else if (a < b) 구문에서는 비교 연산자(<, >)를 사용해 number와 string을 비교하며, 비교 연산자는 값을 비교할 때마다 타입을 자동 변환이 이루어진다. 숫자 타입과 문자열 타입을 비교할 때는 문자열 타입을 숫자 타입으로 변환해 비교하며 이는 number와 string이 같기 때문에 False (=== 연산자는 자동 변환 X)
 * 3. === 연산자에서 False, 비교 연산자(<, >) 연산자에서 False가 되기 때문에 마지막 "Bye"가 출력
 */
