let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
function Timer(seconds) {
    clearInterval(countdown);
    const now = Date.now(); // 현재 시각 가져오기
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    // 아래 countdown이 시간을 동작하는 메인
    countdown = setInterval(() => { // 1초에 한 번씩 초 변경
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft <= 0) { // 초가 0보다 작으면 정지
            clearInterval(countdown); // countdown(입력값)이 끝나면 중지/초기화
            return;
        }
        // 출력
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60); // 분 시간 가져오기
    const remainderSeconds = seconds % 60; // 분을 제외한 남은 초 시간
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const min = end.getMinutes();
    endTime.textContent = `Now ${hour}:${min < 10 ? '0':''}${min}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    Timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault(); // 이벤트를 취소할 수 있을 경우, 발생하는 동작을 멈추는 방법
    const mins = this.minutes.value; // input의 name인 minutes의 값
    Timer(mins * 60);
});