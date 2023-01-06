# Top 10 고급의 CSS 반응형 디자인

## Viewport Meta Tag
```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

디바이스의 크기에 맞게 자동으로 요소들의 크기를 정리한다.   

```initial-scale=1.0```의 크기를 조절할 수 있다.   

## Media Query Orientation
정해진 최소 크기에 따라 스타일을 변경할 수 있다.   

이전에 사용했던 코드는 다음과 같다.   
```
@media (min-width: 300px) {
    .box {
        background: red;
    }
}
```

최신에 변경되어 <b>Orientation</b>을 사용해 처리할 수 있다.   

가로 모드를 적용하고 싶을 때는 orientation의 ```landscape```를 사용한다.
```
@media (orientation: landscape) {
    .box {
        background: red;
    }
}
```

반대로 세로 모드를 적용하고 싶을 때는 orientation의 ```portrait```를 사용한다.
```
@media (orientation: portrait) {
    .box {
        background: red;
    }
}
```

## Media Query Aspect Ratio
```
@media (min-aspect-ratio: 1 / 1) {
    .box {
        background: red;
    }
}
```

위의 코드를 예시로 가로와 세로의 크기가 1:1 비율일 때, 스타일이 적용이 된다.

```
@media (min-aspect-ratio: 16 / 9) {
    .box {
        background: red;
    }
}
```

다른 예시로 콘텐츠에 자주 사용되는 비율인 16:9로도 적용할 수 있다.   

## Media Query Ranges
```
@media (width >= 300px) {
    .box {
        background: red;
    }
}
```

media에 조건문을 사용해 조건에 맞는 경우, 원하는 스타일을 적용할 수 있다. 범위를 조건으로 지정할 수 있다는 것이 특징이다.   

```
@media (min-width: 100px) and @media (max-width: 1900px)
```

위 처럼, 최소 가로 크기와 최대 가로 크기를 지정하는 경우 두 번의 media를 작성할 필요 없이 아래처럼 쉽게 작성할 수 있다.

```
@media (100px <= width <= 1900px)
```

## Container Queries
```
<div class="main">
    <div class="box"></div>
</div>

<div class="sidebar">
    <div class="box"></div>
</div>
```

```
body {
    display: flex;
}

.box {
    background: rebeccapurple;
    width: 100px;
    height: 100px;
    margin: 20px;
}

.main {
    flex-grow: 1;
}

.sidebar {
    width: 20%;
    border-left: 1px solid black;
}

.main,
.sidebar {
    container-type: inline-size;
}

@container (width >= 400px) {
    .box {
        background: red;
    }
}
```

요소들을 둘러싼 컨테이너에 스타일을 지정하고 싶다면 컨테이너 요소들에 ```container-type```를 지정하고 ```@container () {}```로 스타일을 설정하면 된다.   

## Custom Media Queries
```
body {
    display: flex;
}

.box {
    background: rebeccapurple;
    width: 100px;
    height: 100px;
    margin: 20px;
}

@custom-media --small (width >= 400px)
@custom-media --big (width >= 600px)

@media (--small) {
    .box {
        background: red;
    }
}

@media (--big) {
    .box {
        background: orange;
    }
}
```

자바스크립트에서 변수를 선언해서 사용하는 것처럼 ```@media```를 위해 변수를 ```@custom-media```로 선언해서 사용할 수 있다.   

## Different HTML
```
<div class="box mobile-only desktop-only"></div>
```

```
@custom-media --small (width >= 400px)

@media (--small) {
    .mobile-only {
        display: none;
    }
}
```

특정 너비 이상일 경우, 스타일을 지정해서 안 보이게 만들 수 있다.   

## CSS Gird
```
<div class="gird">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
</div>
```

```
body {
    display: flex;
}

.box {
    background: rebeccapurple;
    width: 100px;
    height: 100px;
    margin: 20px;
}

.gird {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
```

그리드 형식으로 나타내고 싶을 때, ```display: grid```를 우선적으로 설정하고 ```grid-template-columns: repeat(3, 1fr)```로 몇 개씩, 특정 크기의 간격으로 설정할 수 있다.   

```
body {
    display: flex;
    margin: 0;
}

.box {
    background: rebeccapurple;
    width: 100px;
    height: 100px;
}

.gird {
    width: 100%;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
```

위 처럼 간격을 ```gap```으로 설정하고 나서 배열을 브라우저 너비에 맞게 자동으로 설정하고 간격을 최소와 최대로 맞춰서 스타일을 지정할 수 있다.   

```repeat의 auto-fit```은 요소의 개수에 따라 너비가 달라진다. 만약 요소가 여러 개일 경우, 너비는 그 만큼 줄어들고 반대로 요소가 2~3개 정도로 적을 경우, 너비는 브라우저에 맞게 그 만큼 넓어진다.   

```repeat의 auto-fill```은 위와 다르게 요소의 개수에 상관없이 요소의 너비가 일정하게 유지된다.   

기타로 ```grid-auto-rows```로 열의 길이를 정할 수도 있다.   

## Clamp
```
body {
    display: flex;
    margin: 0;
}

.box {
    background: rebeccapurple;
    height: 200px;

    min-width: 300px;
    width: 75%;
    max-width: 500px;
}
```

너비의 기본적인 크기와 최소 너비, 최대 너비를 설정한다면 위 처럼 작성할 수 있었다. 그러나 ```Clamp```를 사용하면 한 줄의 코드로 쉽게 설정할 수 있다.   

```
body {
    display: flex;
    margin: 0;
}

.box {
    background: rebeccapurple;
    height: 200px;

    width: clamp(300px, 75%, 500px);
}
```

물론, 다른 경우에도 활용이 가능하다.   

```
body {
    display: flex;
    margin: 0;
}

.box {
    background: rebeccapurple;
    height: 200px;

    font-size: clamp(.75rem, 1.5vw, 2rem);
}
```

## Viewport Units
* 기본 Font 설정 예시
```
<div class="box"></div>
```

```
body {
    display: flex;
    margin: 0;
    font-size: clamp(.5rem, 3.5vw, 10rem);
}

.box {
    background: rebeccapurple;
    height: 200px;
}
```

* 크기 조절 단위
```
.box-1 {
    background-color: lightgreen;
    height: 50vh;
}

.box-2 {
    background-color: lightblue;
    height: 50svh;
}

.box-3 {
    background-color: lightcoral;
    height: 50lvh;
}

.box-4 {
    background-color: lightgrey;
    height: 50dvh;
}
```

크기의 조절을 할 때, 여러 단위가 있다. 예시로 위에서 보는 것처럼.   

```vh```와 ```lvh```의 크기가 같고 ```dvh```는 스크롤할 때마다 크기가 달라진다.   

[Top 10 고급 CSS](https://www.youtube.com/watch?v=TUD1AWZVgQ8)