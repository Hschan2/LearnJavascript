/**
 * 자바스크립트에서 효율적으로 날짜 불러오기
 * newDate()에서 벗어나자.
 * 1. Moment 라이브러리 사용하기
 * 2. Intl 포맷팅 사용하기
 * @dateFormatting 날짜를 한국 시간으로 포맷
 * @dateStyleFormat 날짜 스타일 적용 포맷
 * @relativeTime 시간차 포맷 (10일 전)
 */

const date = new Date();
const dateFormatting = new Intl.DateTimeFormat('kr').format(date); // kr, fr, jp, us 등
const dateStyleFormat = new Intl.DateTimeFormat('kr', {
    dateStyle: 'full',
    timeStyle: 'full'
}).format(date);
const relativeTime = new Intl.RelativeTimeFormat().format(-10, 'days'); // days, months, hours 등