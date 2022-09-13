class Counter {
    constructor(runEveryFiveTimes) { // CallBack
        this.counter = 0; // class.js에서 counter 선언
        this.callback = runEveryFiveTimes;
    }

    increase() {
        this.counter++;
        console.log(this.counter);
        // if(this.counter % 5 === 0) console.log('Oh!'); // 5의 배수일 때마다 Oh! 출력
        if(this.counter % 5 === 0) this.callback(this.counter);
            // this.callback && this.callback(this.counter); // callback이 있다면 호출하라
    }
}
function printSomething(counter) {
    console.log(`Oh! ${counter}`); // 호출하는 곳에서 counter 콜백 받는다
}

const coolCounter = new Counter(printSomething); // 인자를 넘기지 않으면 에러
// coolCounter.increase(); // 호출할 때마다 1씩 증가

// function printSomething(counter) {
//     console.log(`Oh! ${counter}`); // 호출하는 곳에서 counter 콜백 받는다
// }
// coolCounter.increase(printSomething); // CallBack 적용

coolCounter.increase(); // CallBack 적용
