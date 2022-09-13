# TypeDI
종속성 주입 기술을 사용하여 구조화된 프로젝트를 빌드할 수 있는 종속성 주입 도구. 즉, 의존성 주입을 통한 모델 관리 등을 돕는 라이브러리이다. (자바스크립트, 타입스크립트 지원)   

## 의존성 주입
개발 중일 때, 의존성에 대한 문제가 발생하기 쉽다.   
```
class Programmer {
    private Coffee coffee;

    public Programmer() {
        this.coffee = new Coffee();
    }

    public startProgramming() {
        this.coffee.drink();
    }
}
```
위 코드에서 Programmer 클래스에서 startProgramming 함수가 호출되기 위해서 Coffee 클래스가 필요로 하는데 이를 <b>Programmer 클래스는 Coffee 클래스의 의존성을 가진다</b>고 표현한다.   

그러나 위 처럼 코드를 작성할 시, 코드의 재활용성이 떨어지고 Coffee 클래스가 수정되었을 때 Programmer 클래스도 수정해야 하는 불편함을 갖게 된다.   

의존성 주입(DI)를 이용하게 된다면
```
class Programmer {
    private Coffee coffee;

    // 마실 커피를 고를 수 있도록
    public Programmer(Coffee coffee) {
        this.coffee = coffee;
    }

    public startProgramming() {
        this.coffee.drink();
    }
}
```
위 처럼 public에 Coffee 클래스를 인자로 두어 나중에 직접 고를 수 있도록 작성할 수 있다. 즉, 필요한(의존) 클래스를 직접 생성하는 것이 아닌, 주입해줌으로써 객체 간의 결합도를 줄이고 조금 더 유연한 코드로 작성할 수 있다.   

의존성 주입을 하게 된다면 아래의 장점을 갖게 된다.   
* Unit Test가 용이하다.
* 코드의 재활용성을 높인다.
* 객체 간 의존성(종속성)을 줄이거나 제거가 가능하다.
* 객체 간 결합도를 낮추면서 유연한 코드를 작성할 수 있다.   

의존성 주입은 한 클래스를 수정하였을 때, 다른 클래스도 수정해야 하는 상황을 막아줄 수 있다.

## TypeDI 사용 예시 (자바스크립트)
```
npm install --save typedi
```

npm을 이용하여 typeDI 설치를 진행한다.   

```
const { Container } = require("typedi");
```

Container느 중요한 객체이다. 의존성을 관리하는 컨테이너로서 객체를 등록하고 꺼내어 사용할 수 있다.   

```
class Foo {
    constructor() {
        console.log("Foo 생성");
    }

    foo() {
        return ["foo", "bar"];
    }
}
```

컨테이너를 사용하기 위해 클래스를 선언한다.   
컨테이너의 get 메서드를 사용하여 객체를 가져와서 사용할 수 있다. 타입 자체를 그대로 받아 가져와서 사용이 가능하다.   

```
const obj = Container.get(Foo);
console.log(obj.foo());

const obj2 = Container.get(Foo);
console.log(obj2.foo());
```

타입을 받을 경우, 객체가 미리 등록되어 있지 않아도 등록을 스스로 수행하고 가져온다.   

첫 번째 obj는 Foo 타입으로 객체를 생성해서 반환한다.   

두 번째 obj2는 이미 생성되어 존재하는 타입이라면 이미 있는 것을 가져온다. (obj)   

만약에 정확하게 등록을 하고 나서 쓰기 위해서는 set 메서드를 사용하면 된다. 그리고 이는 타입을 받을 수 있다.   

```
Container.set(Foo);

const obj = Container.get(Foo);
console.log(obj.foo());

const obj2 = Container.get(Foo);
console.log(obj2.foo());
```

Container.set(Foo)을 하게 되면 미리 등록할 수 있다.   
첫 번째 obj를 선언함으로써 등록된 객체를 가져올 수 있다.   
두 번째 obj2를 사용함으로써 등록된 객체를 가져올 수 있다.   

그러나 이 방법은 단점을 가지고 있다. 한 가지 타입에 대해서 하나의 형태를 가진 객체만을 가져올 수 있으며, 가져올 때마다 타입을 가져와서 넣어주어야 한다는 단점을 가지고 있다.   

이런 단점을 보완하기 위해서 이름을 직접 지정하여 객체를 등록하는 방법이 있다.   

```
Container.set("Naming", new Foo());

const obj = Container.get("Naming");
console.log(obj.foo());

const obj2 = Container.get("Naming");
console.log(obj2.foo());
```