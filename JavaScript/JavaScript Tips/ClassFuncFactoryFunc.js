// Class Function vs Factory Function

// Class Function 기본 사용 방법
class TodoModel {
    constructor(data) {
      this.todos = [];
      this.data = data;
    }

    addData() {
        console.log(`${data} addData`);
    }

    add() {
        console.log('add');
    }
}

const todoModel = new TodoModel('input');
todoModel.addData();

// Factory Function 기본 사용 방법
function TodoModel(data){
    const todos = [];
  
    function addData() {
      console.log(`${data} addData`);
    }
  
    function add() {
        console.log('add');
    }
  
    return Object.freeze({
        addData,
    });
}
  
const todoModel = TodoModel('input');
todoModel.addData();

// 캡슐화, 내부 변수 혹은 감추고 싶은 함수에 접근 가능 여부를 체크한다. 캡슐화가 되지 않으면 보안적 이슈가 발생
// 기본적인 Function은 캡슐화가 된다. Class Function 캡슐화는 되지 않지만 Node JS 12.0.0 버전부터 가능해졌다.
// Class Function 캡슐화
const todoModel = new TodoModel('input');
console.log(todoModel.todos); // []
console.log(todoModel.data); // input
todoModel.add();

// Factory Function 캡슐화
const todoModel = TodoModel('input');
console.log(todoModel.todos); // undefined
console.log(todoModel.data); // undefined
todoModel.add();

// 불변성(Immutable), 정의된 함수를 변경할 수 있는지 여부를 확인한다.
// 보안 혹은 코드 이해를 위해 함수가 변경되지 않도록 하는 것이 좋고 특수 상황에 따라 함수 변경이 필요하나 권장 방식은 아니다.
// Class Function에서 함수 변경이 가능하나 Factory Function에서는 변경되지 않는다. static을 사용하면 개선 가능하나 인스턴스화 되지 않아 사용법에 유의해야 한다.
// static은 메소드를 정적으로 만들기 때문에 상황에 따라 판단해야 한다.
// Class Function
todoModel.add = function() {
    console.log('a new add');
}

todoModel.add(); // a new add

// Factory Function
todoModel.add = function() {
    console.log('a new add');
}

todoModel.add(); // add

// static
class TodoModel {
    #todos;
  
    constructor(data) {
        this.#todos = [];
        this.data = data;
    }
  
    addData() {
        console.log(`${data} addData`);
    }
  
    static add() {
        console.log('add');
    }
}
  
TodoModel.add(); // add
TodoModel.add = function() {
    console.log("a new add"); // Invalid left-hand side in assignment
}

// 상속과 구성
// Class에서 상속을 하지만 Factory에서 구성을 만들어 사용한다.
// Class는 상속을 받기 때문에 상속 받은 모든 메소드를 사용해야 하지만 Factory는 구성하기 때문에 선별적으로 사용 가능하다.
// Factory처럼 사용하려면 새로운 Class를 생성 혹은 Class Person에서 swim()을 제거 후 새로운 Class로 상속받아야 한다.
// Class Function
class Person {
    eat() {
        console.log('I am eating');
    }

    breathe() {
        console.log('I am breathing');
    }
    
    swim() {
        console.log('I am swimming');
    }
}
class Wizard extends Person {
    trick() {
        console.log('I am doing a trick');
    }
}
  
const harry = new Wizard();
const ron = new Wizard();
  
// Harry can:
harry.eat(); // I am eating
harry.breathe(); // I am breathing
harry.swim(); // I am swimming
harry.trick(); // I am doing a trick
  
// Ron can:
ron.eat(); // I am eating
ron.breathe(); // I am breathing
ron.swim(); // I am swimming
ron.trick(); // I am doing a trick

// Factory Function
const Person = () => {
    return {
        eat: () => {
            console.log('I am eating');
        },

        breathe: () => {
            console.log('I am breathing');
        },

        swim: () => {
            console.log('I am swimming');
        },
    };
};
const Trick = () => {
    return {
        trick: () => {
            console.log('I am doing a trick');
        },
    };
};
  
const Wizard = () => {
    return {
        eat: Person().eat,
        breathe: Person().breathe,
        trick: Trick().trick,
    };
};
  
const Muggle = () => {
    return {
        eat: Person().eat,
        breathe: Person().breathe,
        swim: Person().swim,
    };
};
  
// Harry can:
const harry = Wizard();
harry.eat(); // I am eating
harry.breathe(); // I am breathing
harry.trick(); // I am doing a trick
  
// Ron can:
const ron = Muggle();
ron.eat(); // I am eating
ron.breathe(); // I am breathing
ron.swim(); // I am swimming

// this, Class에서 this 문법 사용이 가능하나 Factory에서는 this 문법 사용이 불가하다.
// this 문법은 컨텍스트 손실 문제가 발생할 수 있어 유의해서 사용해야 한다.
// * 컨텍스트 손실: 컨텍스트(Context)가 손실되는 문제. 아래는 예시 코드
class TodoModel {
    constructor(){
        this.todos = [];
    }
    
    reload(){ 
        setTimeout(function log() { 
          console.log(this.todos);
        }, 0);
    }
}
todoModel.reload(); //undefined

// 메모리, Class의 모든 메소드는 프로토 타입 객체에서 한 번 생성되고 모든 인스턴스에서 공유
// 그러나 많은 동일한 객체를 생성할 때 Factory 함수의 메모리 비용이 많이 필요
/**
The memory cost (in Chrome)
+-----------+------------+------------+
| Instances | 10 methods | 20 methods |
+-----------+---------------+---------+
| 10        | 0          |  0         |
| 100       | 0.1Mb      |  0.1Mb     |
| 1000      | 0.7Mb      |  1.4Mb     |
| 10000     | 7.3Mb      | 14.2Mb     |
+-----------+------------+------------+
*/

// 결론
// 메모리 사용에는 Class Function이 효율. 그러나 개발 내용에 따라 Factory Function이 더 안전할 수 있다.
// Class Function과 Factory Function에 사용에 있어서 사용 용도에 맞춰 결정해야 한다.