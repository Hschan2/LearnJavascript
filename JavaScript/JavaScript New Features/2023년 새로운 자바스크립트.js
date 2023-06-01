/**
 * 2023년 새로운 자바스크립트 긱능
 * toReversed
 * toSorted
 * toSpliced
 */

// reverse
const x = [1, 2, 3]
const y = x.reverse() // x를 새로 생성하지 않고 그대로 사용하기 때문에 x도 변화
y.push(0) // [3, 2, 1, 0], x도 [3, 2, 1, 0]

// 위의 문제 해결 방법
const x1 = [1, 2, 3]
const y1 = [...x1].reverse() // x1 배열을 새롭게 복사해서 뒤집기
y1.push(0) // y만 [3, 2, 1, 0]

// 새로운 자바스크립트 기능 - toReversed
const x2 = [1, 2, 3]
const y2 = x2.toReversed()
y2.push(0) // y만 [3, 2, 1, 0]

// 새로운 자바스크립트 기능 - toSorted
const x3 = [1, 3, 2]
const y3 = x2.toSorted()
console.log(x3) // [1, 3, 2]
console.log(y3) // [1, 2, 3]

// splice
const a = ["a", "b", "c", "d"]
a.splice(1, 2) // ["b", "c"], 어떤 값이 삭제되었는지 나타냄
console.log(a) // ["a", "d"]

// 새로운 자바스크립트 기능 - toSpliced
const a1 = ["a", "b", "c", "d"]
const newA = a1.toSpliced(1, 2) // ["a", "d"]

// 새로운 자바스크립트 기능 - with
const x4 = ["a", "b", "c", "x"]
x4[3] = "d" // 배열의 값을 변경하기 위한 기존 방법
console.log(x4) // ["a", "b", "c", "d"]

const z = x4.with(3, "d") // with으로 변경할 위치의 인덱스, 변경할 값을 입력하면 쉽게 변경 가능

// 새로운 자바스크립트 기능 - findLast & findLastIndex
const a2 = ["a", "b", "c", "x", "c"]
a2.find(value => value === "c") // c, 검색과 일치하는 배열의 첫 번째 항목 반환
a2.findIndex(value => value === "c") // 2, 검색과 일치하는 배열의 첫 번째 항목의 인덱스 반환

a2.findLast(value => value === "c") // c, 검색과 일치하는 배열의 마지막 항목 반환
a2.findLastIndex(value => value === "c") // 4, 검색과 일치하는 배열의 마지막 항목의 인덱스 반환