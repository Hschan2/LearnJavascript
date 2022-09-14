// element 가져오기
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// 기능 함수 설정
function togglePlay() { // 비디오 플레이와 중지 기능
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() { // 플레이 버튼과 중지 버튼
    const icon = this.paused ? '▶' : '■';
    toggle.textContent = icon; // toggle 텍스트 변환
}

function skip() { // 몇초 후로, 몇초 전으로 기능
    video.currentTime += parseFloat(this.dataset.skip); // dataset은 data-skip에 설정되어 있는 숫자
}

function handleRangeUpdate() { // name은 volume과 playbackRate, value는 1
    video[this.name] = this.value;
}

function handleProgress() { // 동영상이 진행되고 있는 프로그레스바, (비디오 현재시간/ 비디오 길이) * 100
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) { // 마우스로 진행바 조절, (마우스 X좌표 / 엘리먼트 길이) / 비디오 길이
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// 리스터 이벤트 설정
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // 마우스가 클릭이 아닌 그냥 움직였을 때
progress.addEventListener('mousedown', () => mousedown = true); // 마우스 눌렀을 때
progress.addEventListener('mouseup', () => mousedown = false); // 마우스 눌렀다가 뗐을 때