/**
 * Temporal: 현재시간 구하기
 * Temporal 설치 - npm install @js-temporal/polyfill
 */

// 현재 시간 구하기
const nowDateTime = Temporal.Now.plainDateTimeISO();
const nowDate = Temporal.Now.plainDateISO();
const nowTime = Temporal.Now.plainTimeISO();

const nowDateDirect = Temporal.Now.plainDate(2022, 09, 21); // 날짜 직접 입력 가능
const addDate = nowDateTime.add({ // 날짜 더하기
    days: 10, // nowDateTime 날짜에서 10일 더하기
    months: 3 // nowDateTime 날짜에서 3개월 더하기
})
const subtractDate = nowDateTime.subtract({ // 날짜 빼기
    days: 10, // nowDateTime 날짜에서 10일 빼기
    months: 3 // nowDateTime 날짜에서 3개월 빼기
})
const roundDate = nowDateTime.round({ // 날짜 반올림
    smallestUnit: 'hour', // 시간 단위 반올림 설정
    roundingMode: 'floor'
})

const D_day = Temporal.plainDateTimeISO.from('2022-09-30T12:00:00'); // 특정 날짜 설정
const todayDate = Temporal.Now.plainDateTimeISO();
const differenceDate = D_day.since(todayDate); // since로 날짜 차이 구하기
console.log(differenceDate.days); // 날짜 차이 구하기
console.log(differenceDate.hours); // 시간 차이 구하기