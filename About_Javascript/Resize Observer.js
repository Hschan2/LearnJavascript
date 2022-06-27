// @media 대신 Observer로 크기 조절하기

// 크기 조절할 요소 가져오기
const box = document.querySelector(".box");
const container = document.querySelector(".container");

// Observer 선언
const observer = new ResizeObserver((entries) => {
    // box와 container 요소 감지
    console.log(entries);

    // box 요소의 width가 150보다 작을 경우 배경색을 파랑색, 150 이상일 경우 빨강색
    const boxElement = entries[0];
    const isSmall = boxElement.contentRect.width < 150;
    boxElement.target.style.backgroundColor = isSmall ? "blue" : "red";
});

observer.observe(box);
observer.observe(container);