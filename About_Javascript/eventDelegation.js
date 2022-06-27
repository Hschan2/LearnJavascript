// 이벤트 위임
const btns = document.querySelectorAll('.menu-btn');
const menu = document.querySelector('.menu');

function clickBtnHandler(event) { // 리스너가 함수를 부르면 ()안에는 event가 기본적으로 들어가 있다
    console.log(event.target); // event의 target 속성 출력
}

function clickHandler(event) {
    // 이 기능을 css에서 할 수 있다 => pointer-event를 none으로 설정하면 된다 -> 다만, 부모 노드에 할 경우 자식 노드도 클릭할 수 없게 된다
    let elem = event.target;
    while(!elem.classList.contains('menu-btn')) { // menu-btn을 가지고 있지 않다면. 자식 노드가 몇 개가 있을지 모르니까 반복문으로 확인
        elem = elem.parentNode; // 부모 노드를 할당해서 확인. menu-btn이 있나 계속 확인

        if(elem.nodeName == 'body') { // elem이 menu-btn의 부모 노드를 찾다가 마지막 body까지 갔을 때
            elem = null; // elem에 null값을 주고
            return; // 반환. 즉 버튼이 아닌 배경을 클릭했을 때 아무 일도 일어나지 않게
        }
    }
    console.log(elem.dataset.value);

    // console.log(event.target.getAttribute('data-value')); // html의 button의 data-value를 가져오겠다.
    console.log(event.target.dataset.value); // data-value의 value를 속성 이름을 가진 데이터를 출력
}

menu.addEventListener('click', clickBtnHandler); // 클릭 이벤트를 바인딩해서 처리 => 무한 스크롤을 상상해보자
// 위 함수를 for문으로 돌리면 위임 없이 모든 버튼을 가져와서 console에 출력 => 비효율적

window.addEventListener('click', () => { // 어느 곳이든 클릭하면
    const htmlStr = `
    <button class="menu-btn" data-value="1">
        <img class="icon" src="../images/ilbuni1.png" alt="">
        <span class="btn-label">일분이 1</span>
    </button>
    <button class="menu-btn" data-value="2">
        <img class="icon" src="../images/ilbuni2.png" alt="">
        <span class="btn-label">일분이 2</span>
    </button>
    <button class="menu-btn" data-value="3">
        <img class="icon" src="../images/ilbuni3.png" alt="">
        <span class="btn-label">일분이 3</span>
    </button>
    `;
    menu.innerHTML = htmlStr; // menu클래스를 가진 div안에 위에 코드를 넣는다
}); // 아무 곳이나 클릭하고 생겨난 위의 코드에서 버튼을 누르면 이벤트를 위임한 위의 클릭 함수가 출력된다 => 이벤트 위임의 장점