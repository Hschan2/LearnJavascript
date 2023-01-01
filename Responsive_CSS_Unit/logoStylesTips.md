# 이미지 로고를 사용할 때, 꿀팁
온라인에서 무료 이미지 로고를 사용할 때, 흰 색 배경때문에 포토샵으로 수정을 하거나 크기를 통일해서 적용하고 싶을 때도 포토샵을 사용하게 된다. 그렇게 매 번 귀찮은 일이 발생하는데 이를 CSS에서 처리할 수가 있다.   

## 예시 코드
* 통일성이 없고 이미지의 배경색까지 제거되지 않은 상태의 일반적인 스타일 적용
```
<style>
    .photos img {
        width: 15%;
    }

    .photos {
        background: #dfdfdf;
        padding: 20px;
    }
</style>
```

* 크기를 같게 조정하고 배경색 제거된 이미지만 나타내도록 수정
```
<style>
    .photos img {
        width: 15%;
        // 너비 15%, 높이 5%
        aspect-ratio: 3/2;
        object-fit: contain;
        mix-blend-mode: color-burn;
    }

    .photos {
        background: #dfdfdf;
        padding: 20px;
    }
</style>
```

* aspect-ratio
    * 요소의 크기를 일관되게 조정
    * width / height
    * width 설정 필수
    * min-... 코드가 없어야 하는 조건
* object-fit
    * 요소를 규격에 맞게 설정
    * contain, 가로, 세로의 크기에 맞게 크기가 조정되고 고정
* mix-blend-mode
    * 포토샵의 블렌드 모드 기능
    * color-burn, 이미지 겹치는 부분의 색상 날리기