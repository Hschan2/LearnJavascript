var dropzone = document.getElementById("dropzone"); // HTML 파일의 dropzone의 id를 가진 div를 가져오기
var nodes = document.getElementsByClassName("node"); // HTML 파일의 node의 class를 가진 div를 가져오기
var selectedNode = ''; // 드래그를 하려는 노드 변수 초기화
var selectedNodePos = 0; // 드래그할 노드 위치 변수 초기화

for (var i = 0; i < nodes.length; i++) { // HTML의 node 갯수 만큼 반복
	nodes[i].addEventListener("mousedown", (ev) => { // 마우스를 클릭했을 때
		for (var i = 0; i < nodes.length; i++) {
			nodes[i].style.backgroundColor = 'cornsilk'; // node의 배경색을 변경
		}

		// 선택한 node만의 style 변경
		document.getElementById(ev.target.id).style.backgroundColor = '#b5fdab'; 
		document.getElementById(ev.target.id).style.transition = '0s';
		dropzone.style.backgroundColor = '#d9fdff';
	});

	nodes[i].addEventListener("dragstart", (ev) => { // node를 드래그했을 때
		ev.dataTransfer.setData('text', ev.target.id); // 드래그할 때 안에 있는 문자들을 가져오라 (드래그할 때 문자가 보이는 것)
		console.log('drag');

		selectedNode = document.getElementById(ev.target.id); // 선택한 node
		setTimeout(() => {
			dropzone.removeChild(selectedNode);
		}, 0); // 0초뒤에 실행
	});

	nodes[i].addEventListener("dragend", (ev) => { // 드래그를 끝낼 때
		if(ev.path[1] == undefined) { // 드래그한 node의 위치의 값을 알 수 없을 때
			console.log(ev.target.id + " is out!"); // node가 범위에 벗어났다
			dropzone.insertBefore(ev.target, dropzone.children[selectedNodePos]); // 드래그를 드롭했을 때 dropzone에 선택한 node를 드래그한 위치에 넣어라
			dropzone.style.backgroundColor = '#b5d9ff';
			selectedNode.style.backgroundColor = 'cornsilk';
			resetNodes(); // resetNodes 함수를 불러온다
		}
	});
}

dropzone.addEventListener("dragover", (ev) => {
	ev.preventDefault(); // 동작을 중단
	position(ev.clientY); // position 함수에 드래그한 node의 Y값을 넣는다
});

dropzone.addEventListener("drop", (ev) => {
	ev.preventDefault();
	console.log('drop');

	dropzone.insertBefore(selectedNode, dropzone.children[selectedNodePos]); // 드래그를 드롭했을 때 dropzone에 선택한 node를 드래그한 위치에 넣어라
	resetNodes();
	dropzone.style.backgroundColor = '#b5d9ff';

	setTimeout(() => {
		selectedNode.style.backgroundColor = 'cornsilk';
		selectedNode.style.transition = '0.5s';
	}, 200);
}); 
/*
Array.prototype.forEach.call(dropzone.children,(e)=>{
	e.addEventListener("dragend",(ev)=>{
		//if(document.querySelector("#"+ev.target.id) == null) console.log("out");
		if(ev.path[1] == undefined) {
			console.log(ev.target.id + " is out!");
			dropzone.insertBefore(ev.target, dropzone.children[selectedNodePos]);
			dropzone.style.backgroundColor = '#b5d9ff';
			selectedNode.style.backgroundColor = 'cornsilk';
		}
	});
});
*/
function establishNodePositions() {
	for (var i = 0; i < nodes.length; i++) {
		var element = document.getElementById(nodes[i]['id']); // 각 node의 id값을 가져와라
		var position = element.getBoundingClientRect(); // 좌표값 가져오기
		var yTop = position.top; // 각 node의 top 위치값
		var yBottom = position.bottom; // 각 node의 bottom 위치값
		nodes[i]['yPos'] = yTop + ((yBottom - yTop) / 2); // 각 node의 top - bottom한 각 node 사이 위치
	}
}

function resetNodes() { // 각 node의 marginTop값을 초기화
	for (var i = 0; i < nodes.length; i++) {
		document.getElementById(nodes[i]['id']).style.marginTop = '0.5em';
		document.getElementById(nodes[i]['id']).style.transition = '0s';
	}
}

function position(currnetYPos) { // 실질적으로 범위내에 드래그한 node가 드롭했을 때 위치를 담은 함수
	establishNodePositions();

	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i]['yPos'] < currnetYPos) { // node의 y 값이 드래그한 node의 y의 위치보다 위일 때
			var nodeAbove = document.getElementById(nodes[i]['id']); // 각 node의 id값을 넣어라
			selectedNodePos = i + 1; // node의 위치값에서 1씩 더해라
		} else { // 위가 아닐 때
			if (!nodeBelow) { // nodeBelow가 false라면
				var nodeBelow = document.getElementById(nodes[i]['id']); // 각 node의 id값을 넣어라
			}
		}
	}

	if (typeof nodeAbove == 'undefined') { // nodeBelow의 타입이 정의되어 있지 않을 때, 즉 알 수 없을 때
		selectedNodePos = 0; // 선택한 node의 위치값을 0으로
	}

	resetNodes();

	if (typeof nodeBelow == 'object') { // nodeBelow의 타입이 object라면, 드래그할 때 밑에 node의 값이 object라면
		nodeBelow.style.marginTop = '1em';
		nodeBelow.style.transition = '0.5s';
	}
}