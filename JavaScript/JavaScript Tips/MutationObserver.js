/*
MutationObserver는 DOM의 형식을 쉽고 효율적으로 변화하게 만든다. 이는 DOM의 변경 감시를 제공한다.

new MutationObserver(
    function callback
);

콜백 함수는 각 DOM 변경 시 호출이 되며 감시자는 두 인자와 함께 이 함수를 호출한다.
첫 번째 인자는 오브젝트들의 배열이고 두 번째 인자는 이 MutationObserver 인스턴스다.

가장 기본적인 사용법은 다음과 같다.

1. 대상 선정
var target = document.getElementById("some-id");

2. 옵저버 인스턴스 생성
var observer = new MutationObserver(function(mutation) {
    mutation.forEach(function(mutation) {
        console.log(mutation);
    });
});

3. 옵션 설정
var config = {
    attributes: true,
    childList: true,
    characterData: true
};

True/False로 설정
    attributes: 대상 노드의 속성에 대한 변화 감시
    childList: 대상 노드의 하위 요소의 추가 및 제거 감시
    characterData: 대상 노드의 데이터에 대한 변화 감시
    subtree: 대상 노드의 자식 뿐만 아니라 손자 이후로 모두 감시
    attributeOldValue: 대상 노드의 속성 변경 전의 내용도 기록
    characterDataOldValue: 대상 노드의 데이터 변경 전의 내용도 기록
["A", "B"]처럼 배열로 설정
    attributeFilter: 모든 속성 돌연변이를 관찰 할 필요가 없는 경우 속성 네임 스페이스없이 속성 로컬 이름의 배열로 설정

옵저버 실행 중지
observer.disconnect();
*/

// Web Dev Simplified 유튜브 강의 코드 (https://www.youtube.com/watch?v=Mi4EF9K87aM)
const mutationObserver = new MutationObserver(entries => {
    console.log(entries);
});

const parent = document.querySelector(".parent");

// parent 노드에서 하위 요소 추가 및 제거 감시 설정
// 속성 감시 설정
// 변경 전 내용 기록
// 로컬 속성의 변경 감시 (예. title 설정 시, parent.title = ... 할 경우 감시)
// parent 노드의 데이터 변경 시 감시 ( mutationObserver.observe(parent.children[0].childNodes[0], {...} )
// 노드의 자식, 손자 요소의 변화 감시
mutationObserver.observe(parent, { 
    childList: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ["title"],
    characterData: true,
    subtree: true
});

// MutationObserver 연결 해제
// 연결 해제하였기 때문에 아래의 remove, appendChild 감시 불가
mutationObserver.disconnect();

// MutationObserver에서 요소 제거 감시
parent.children[0].remove();

// MutationObserver에서 요소 추가 감시
parent.appendChild(document.createElement("div"));

// MutationObserver에서 속성 변경 감시
parent.id = "New Id";

// 손자 요소의 변화 감시
parent.children[0].id = "Test";