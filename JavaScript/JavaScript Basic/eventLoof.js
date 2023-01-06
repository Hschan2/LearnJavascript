/*
    while(shouldRun()) {
        doSomething();
    }

    * shouldContinue method
        pending:
            1. setTimeout, setInterval, setImmediate
            2. OS tasks(HTTP server)
            3. Own tasks (Filesystem)
*/

/*
 이벤트 루프 알아보기 전
 
 1. 동기 vs 비동기
    1) 동기는 코드가 작성된 순서 그대로 실행되는 것
    2) 비동기는 꼭 순서대로 실행되는 것이 아닌 것 => 쓰레드나 프로세스가 여럿이 돌고 있다는 말도 된다(멀티태스킹)
*/

// 비동기식 코드
function asyncBlackBeanTimer(sec) {
    console.log("짜장면 배달 완료");

    setTimeout(() => { // 콜백 함수
        console.log("식사 완료"); // 식사 완료를 실행한다
    }, sec*1000); // 이 정도 시간이 지나면 위에

    console.log("배달부 떠남");
}

asyncBlackBeanTimer(1);

// 이벤트 루프

function asyncBlackBeanEaters(name) {
    console.log(`${name}에게 배달`);

    http.get("http://localhost:81/eat-noodle-rand",
    function() {
        console.log(`${name} 식사 완료`);
    });
}

let eaters = ["유민상","김준현","문세윤","김민경","돈스파이크"];
for(let i=0; i<eaters.length; i++) {
    asyncBlackBeanEaters(eaters[i]);
} // "이름"에게 배달 -> "이름" 식사 완료 순서대로 출력될 것 같으나 "이름"에게 배달을 5번 출력하고 그 다음에 "이름" 식사 완료를 5번 출력한다
// 자바스크립트를 돌리는 쓰레드가 있는데 이는 먼저 들어간 것이 먼저 나오는 큐 형태이지만
// 함수는 나중에 들어간 것이 먼저 나오는 스택 형식이다

// 다른 포함 레벨의 함수들은 역순으로 처리
/*
    function fun_1() {
        console.log("함수1");
    }
    function fun_2() {
        fun_1();
        console.log("함수2");
    }
    function fun_3() {
        fun_2()
        console.log("함수3");
    }
    fun_3();

    fun_3이 fun_2를 호출하고 fun_2가 fun_1을 호출하는 역순으로 호출 후 fun_1 -> fun_2 -> fun_3 순으로 실행
*/

// 같은 포함 레벨 함수들은 순서대로 호출 실행
/*
    fun_1();

    fun_2();

    fun_3();

    fun_1 -> fun_2 -> fun_3 순으로 호출 및 실행
*/

// 이는 WEB API에서도 실행이 가능하다(시간을 소요하는 작업 => 타이머, http 요청, 파일에서 데이터 읽어오기 등)
// 비동기 처리를 할 때 콜백 함수의 태스크가 들어오면 이는 자바스크립트 쪽이 아닌 비동기 처리를 하는 WEB API(브라우저, node js)로 이동
// 시간이 걸린 이동을 마친 콜백 함수의 태스크는 도착한 순서대로 태스크 큐에 보낸다
// 그리고 태스크 큐에 도착한 태스크들은 순서대로 자바스크립트 쪽으로 이동해 출력된다
// 이 과정에서 태스크 큐에는 반복적으로 돌아가는 것이 있는데 비동기 작업이나 클릭 등 사용자 입력에서 콜백 태스크를 기다리고 있다.
// 태스크 큐에 도착한 순서대로 자바스크립트에서 실행되도록 하는 것이 "이벤트 루프!!"

// 비동기로 여러 함수를 실행해야 할 때는 함수 안에 함수 그리고 그 안에 함수를 넣어 실행하는 비효율적으로 움직이는데 이를 해결할 수 있었던 방법의 1단계가 Promise다

// Promise
/*
    function 정보조회_Promise(학번) {
        return new Promise(function (resolve) => {
            ajax(baseUrl + "content-info/" + info, // 첫 번째 인자로 비동기 작업
                function(res) { //콜백 함수에 전달하는 함수
                    resolve(res);
                });
        });
    }
    function 주소조회_Promise(번호) {
        return new Promise(function (resolve) => {
            ajax(baseUrl + "content-info/" + info,
                function(res) {
                    resolve(res);
                });
        });
    }

    그리고 이를 호출할 때

    정보조회_Promise("123")
    .then(function(정보) { // 비동기 작업을 마치면 then을 수행 -> 콜백 함수를 실행하라
        return 주소조회_Promise(번호)
    })
    .then(function (번호)) {
        return 다음 함수
    }

    으로 사용
    다만, 익스플로어에서 실행이 안된다.
*/

// 이를 해결할 수 있는 방법이 async와 await가 있다

/*
    async function 검색_Promise(학번) {
        let 정보조회 = await 정보조회_Promise(학번); // await을 하면 wait. 잠깐 기다려 정보조회_Promise(학번)의 정보를 이 변수에 넣어주고 다음 작업 실행
        let 주소조회 = await 주소조회_Promise(번호); // 위와 반복

        console.log(`정보: ${학생['학생명']}`);
    }

    검색_Promise("123");
*/