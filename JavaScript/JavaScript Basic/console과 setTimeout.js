/**
 * Console.log와 setTimeout
 */

function test1() {
    let i = 0;

    setTimeout(() => console.log(i), 100);

    for (i = 0; i < 100000000; i++) {
        i++;
    }
}

/**
 * test1 함수를 동작시키면 어떤 값이 출력이 될까?
 * 답은 100000000이다.
 * 이유는 setTimeout의 동작 과정을 이해하면 알 수 있다.
 */

function setTest() {
    console.log("함수, setTimeout 시작");
    setTimeout(() => {
        console.log("1");
        console.log("setTimeout 종료");
    }, 1000)

    console.log("함수 종료");
}

/**
 * 위의 setTest 함수의 동작 과정을 보면
 * "함수, setTimeout 시작"
 * "함수 종료"
 * "1"
 * "setTimeout 종료"
 * 순서대로 실행이 된다.
 * 그 이유는 setTimeout이 실행이 되고 종료가 되기 전에 다음 실행 코드로 넘어간다.
 * 그래서 setTimeout()이 실행되고 나서 바로 다음 코드인 console.log("함수 종료")이 실행이 되고 그 다음에 setTimeout()의 내부 코드들이 실행이 된다.
 * 즉, setTimeout() 순서가 되면 setTimeout()이 스택에 쌓이고 이는 webapis에 넘어가 동작 종료까지 대기하다가 나머지 코드들이 모두 완료가 된 후에 동작을 끝낸다.
 */

function test2() {
    console.log("1");
    console.("1");
    console.log("2");
    console("1");
}

/**
 * console에 대해 알아보자.
 * 위에 코드를 보면 에러가 난다.
 * 왜냐하면, 두 번째 코드에 console.("1")가 식별자 없이 실행이 됐기 때문이다.
 * log, error, warn의 식별자를 사용해서 처리해야 한다.
 */

function func1() {
    console.log("func1");
    func2();
}

function func2() {
    setTimeout(() => console.log("func2"));
    func3();
}

function func3() {
    Promise.resolve()
        .then(() => console.log("success1"))
        .then(() => console.log("success2"));
    console.log("func3");
}

/**
 * 마지막으로 함수 호출에 대해 알아보자
 * 위에 결과값은 다음과 같다
 * func1
 * func3
 * success1
 * success2
 * func2
 * 
 * 이유는 위에 setTimeout을 이해했으니 Promise만 이해하면 된다.
 * 1. func1 함수 내 콘솔은 바로 출력되고 바로 func2 함수를 호출한다.
 * 2. func2 함수에서 setTimeout은 실행되고 다음 코드가 끝나기 전까지 대기 상태가 되기 때문에 func3 함수가 호출된다.
 * 3. func3 함수에서 Promise는 비동기 호출이기 때문에 우선 요청을 보내고 응답이 오기 전까지 다음 코드 진행을 시작한다.
 * 4. 그렇기 때문에 응답이 오기 전에 func3을 호출하고 응답을 받고 나서 success1과 success2을 호출한다.
 * 5. func3의 모든 응답이 끝났기 때문에 func2 함수의 setTimeout이 출력되고 마무리된다.
 */

