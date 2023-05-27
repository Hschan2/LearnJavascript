# 저동저장 편집기
오로지 '바닐라 자바스크립트'만을 이용해서 자동저장 편집기를 만들며 자바스크립트 기본기를 탄탄하게 만들어본다.   

자바스크립트는 모듈화하여 'Import'로 파일마다 각 기능을 하도록 만든다.   

## 사용에 필요한 내용

### document.createDocumentFragment란?
- 새로운 빈 DocumentFragment 를 생성 (다른 노드들을 담는 임시 컨테이너 역할)
- DocumentFragments 는 dom 노드들로서 메인 DOM 트리의 일부가 아닌 추가되는 형식

👉 메인 DOM에 영향을 주지 않고(재랜더링 되지 않음) 메모리에서만 정의가 된다. (메모리상에서만 존재하는 빈 템플릿)

```
let ul = document.getElementsByTagName("ul")[0];
let doc_frag = document.createDocumentFragment();
const browserList = ["Internet Explorer", "Firefox", "Safari", "Chrome", "Opera"];

browserList.forEach(function(e) {
  const li = document.createElement("li");
  li.textContent = e;
  doc_frag.appendChild(li);
});

ul.appendChild(doc_frag);
```

doc_frag가 아닌 일반 element를 만들어서 추가한 후 ul에 추가하는 방식과의 차이이다.   

👉 DocumentFragment는 ul에 추가하면 안에있던 요소가 이전 되어 doc_frag에 남아있지 않다.   

반면, 일반 element는 추가 전후의 div element가 동일하다
