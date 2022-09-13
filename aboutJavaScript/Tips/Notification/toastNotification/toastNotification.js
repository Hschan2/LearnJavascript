// HTML 요소 가져오는 변수
const button = document.querySelector("button"),
    toast = document.querySelector(".toast"),
    closeIcon = document.querySelector(".close"),
    progress = document.querySelector(".progress");

// Progress 타이머, 알람창 타이머 변수
let timer1, timer2;

// 알람 전달 버튼 클릭 시
button.addEventListener("click", () => {
    toast.classList.add("active");
    progress.classList.add("active");

    // 5초 뒤에 toast 요소의 active 클래스 제거
    timer1 = setTimeout(() => {
        toast.classList.remove("active");
    }, 5000); //1초 = 1000밀리세컨드

    // 5.3초 뒤에 progress 요소의 active 클래스 제거
    timer2 = setTimeout(() => {
        progress.classList.remove("active");
    }, 5300);
});

// 알람창의 닫기 버튼 클릭 시
closeIcon.addEventListener("click", () => {
    // toast (알람창)에서 active 클래스 제거
    toast.classList.remove("active");

    // 0.3초에 progress에서 active 클래스 제거
    setTimeout(() => {
        progress.classList.remove("active");
    }, 300);

    // setTimeout 초기화
    clearTimeout(timer1);
    clearTimeout(timer2);
});
