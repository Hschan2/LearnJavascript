// async & await (with promise)

// 1. async

function fetchUser() {
    // 10초 뒤에 네트워크 요청
    // return 'ellie';
    return new Promise((resolve, reject) => {// Promise를 가지고 있으면 then(콜백 함수)을 등록해 놓으면 유저의 데이터가 준비되는 대로 콜백 함수를 불러주겠다.
        // return 'ellie'; // => resolve, reject를 쓰지 않고 return하면 pendding 상태
        resolve('ellie');
    })
} // => 이러한 번거로움을 해결해줄 수 있는 것이 async 키워드를 사용하는 것

async function fetchUserAsync() { // async => 비동기
    return 'ellie'; // 자동으로 promise()로 만들어준다.
}

const user = fetchUser();
user.then(console.log);
// console.log(user);

const asyncUser = fetchUserAsync();
asyncUser.then(console.log);

// 2. await
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
    await delay(1000); // await은 async 안에서만 사용 가능. delay가 끝날 때까지 기다린다. 즉, 3초 있다가 Apple를 return
    return 'Apple';
}

async function getBanana() {
    await delay(1000);
    return 'Banana';
}
/*
async function getBanana() { // Promise를 사용하자면
    return delay(3000);
    .then(() => 'Banana');
}
*/

function pickFruits() { // 동기적으로 apple과 banana를 불러오는 함수. 번거로움
    return getApple().then(apple => {
        return getBanana().then(banana => `${apple} + ${banana}`);
    });
}

// 이를 async를 이용해서 간단하게 사용 가능
async function asyncPickFruits() { // asycn를 이용해 동기적으로 보일 수 있도록 apple과 banana를 불러오는 함수. 간단
    // const apple = await getApple(); // 1초 기다려
    // const banana = await getBanana(); // 1초 기다려 => apple과 banana 서로 기다려야 한다 => 이를 해결하자면 아래
    const applePromise = getApple(); // Apple의 Promise()
    const bananaPromise = getBanana(); // Banana의 Promise()
    const apple = await applePromise;
    const banana = await bananaPromise; // 위에 Promise로 선언을 해서 불러오면 병렬적으로 서로 기다릴 필요 없이 1초 대기 후 return 출력
    // *****에러 처리를 할 수 있다
    return `${apple} + ${banana}`;
} // 그러나 위는 많은 코드를 사용해서 비효율적이다.

// Promise APIs를 이용해서 위의 코드를 간단하게 만들 수 있다.
function pickAllFruits() {
    return Promise.all([getApple(), getBanana()])// .all => 모든 Promise들이 병렬적으로 다 받을 때까지 모아준다
    .then(fruits => fruits.join(' + '));
}

// pickFruits().then(console.log);
asyncPickFruits().then(console.log);

pickAllFruits().then(console.log);

function pickOnlyOne() { // 우선적인 것 하나만 호출한다.
    return Promise.race([getApple(), getBanana()]); // 먼저 수행하는 것 딱 하나만 출력
}

pickOnlyOne().then(console.log);