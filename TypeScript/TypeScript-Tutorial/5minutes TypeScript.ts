// 설치, npm install -g typescript

// 타입스크립트 파일 생성, 파일명.ts or 파일명.tsx(+ html)
// 파일명.ts로 생성 후 코드 컴파일을 위해서 tsc 파일명.ts

// 기본 사용
function greeter(person: string) { // 타입 설정, string 외 사용 시 에러
    return "Hello, " + person;
}

let user = "Jane User";
let wrongUser = [0, 1, 2]; // string 타입이 아닌 array와 number 타입으로 에러

document.body.textContent = greeter(user);

// 인터페이스
interface interFacePerson {
    firstName: string;
    lastName: string;
}

function interfaceGreeter(person: interFacePerson) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let interfaceUser = { firstName: "Jane", lastName: "User" };

document.body.textContent = interfaceGreeter(interfaceUser);

// 클래스
class classStudent {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface classPerson {
    firstName: string;
    lastName: string;
}

function classGreeter(person: classPerson) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let classUser = new classStudent("Jane", "M.", "User");

document.body.textContent = classGreeter(classUser);