// Union Types

type combinable = number | string; // 타입 변수 선언으로 한 번에
type ConversionDescrptor = 'Number' | 'Text';
function combine(n1: combinable, n2: combinable, resultConversion: ConversionDescrptor) {
    let result; // let은 지역 변수
    if(typeof n1 === 'number' && typeof n2 === 'number' || resultConversion === 'Number') result = +n1 + +n2; // 매개변수가 number면
    if(typeof n1 === 'string' && typeof n2 === 'string' || resultConversion === 'Text') result = n1.toString() + n2.toString(); // 매개변수가 string이면 string으로 변환 후 더하기
    
    // if(resultConversion === 'Number') return +result; // parseFloat(result)
    // if(resultConversion === 'Text') return result.toString();
    return result;
}

const combineAges = combine(20, 36, 'Number');
console.log(combineAges); // 56

const combineStringAges = combine('20', '36', 'Number');
console.log(combineStringAges); // 2036

const combineNames = combine('Hello', 'World', 'Text');
console.log(combineNames); // HelloWorld