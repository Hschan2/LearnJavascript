// recursive function => 재귀 함수 (자기 자신을 호출하는 함수)
/*
 function recursive(인자) {
     작업수행
     if(조건충족) {
         return 결과
     } else { // 주어진 조건이 충족될 때까지
         return recursive(작업된인자) // 스스로 불러내는 것을 반복하면서 작업수행을 수행
     }
 }
*/

let numbers = [3, 1, 4, 1, 5, 9];

function recursive(acc, array) { // numbers의 총합을 구하는 함수
    if(array.length === 0) { // numbers의 값이 없다면
        return acc; // 0을 호출
    } else {
        return recursive(acc + array[0], array.slice(1)); // 0 + 3, 3 + 1 ... 총합이 구해질 때까지 반복
    }
}
recursive(0, numbers);
// 위와 같은 함수는 반복문으로 실행이 가능하고 반복문이 쉬울 수 있다. 그러나

let numAndAryHell = [3, [1, 4, [3, [6, 2], 5], 1, 3], 4, [8, 1, [2, 1, 9], 5], 5, 9];
// 위처럼 배열안에 배열이 온다면?
// for() { for() {}} 등 for문 안에 for문을 넣는 방식으로 더러운 코드를 사용해야 할 것이다.

// 하지만 재귀함수를 쓰면 간단하게 처리할 수 있다
function recursive_deep (acc, array) {
    if(array.length === 0) {
        return acc;
    } else {
        return recursive_deep(acc + (typeof array[0] === 'number' ? array[0] : recursive_deep(0, array[0])), array.slice(1));
    }
}

recursive_deep(0, numAndAryHell);
// 다만, 재귀함수는 호출될 때마다 메모리의 스택에 쌓이게 되는데 나중에는 메모리 부족으로 에러가 뜰 수 있다.
// => 이를 해결하기 위해 많은 언어들은 꼬리 재귀 최적화(Tail Call Optimization)을 제공 => 재귀함수를 컴퓨터가 재해석해서 선형 알고리즘으로 만들어 실행

function canTailRecurse(arg) {
    return canTailRecurse(arg); // 함수 자체만 return => 재귀 함수 가능
}

function canTailRecurseFail(arg) {
    let n;
    return n * canTailRecurseFail(arg); // 다른 것과 섞여 return => 재귀 함수 불가
}

// 재귀함수를 사용하기 가장 좋은 게임은 하노이 탑

function hanoi(num, from, to, other) { // (갯수, 어디서, 어디로, 나머지)
    if(num === 0) return; // 갯수가 없으면 종료
    hanoi(num - 1, from, other, to); // 받아온 갯수보다 하나 적은 원반들을 목적지가 아닌 곳으로 이동
    console.log(`${from}번에서 ${to}로 옮긴다.`); // 맨 아래 원반을 목적지로 이동
    hanoi(num - 1, other, to, from); // 다른 곳으로 옮겼던 원반들을 그 위에 얹는다
}
hanoi(4, 0, 1, 2);