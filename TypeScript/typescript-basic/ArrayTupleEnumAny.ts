// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {ADMIN = 'ADMIN', READ_ONLY = 10, AUTHOR = 20}; // 입력한 순서대로 인덱스 설정. ADMIN => 0, READ_ONLY => 1, AUTHOR => 2, 초기값 설정은 이름 그대로

const person: { // object 선언으로 변수 타입 선언과 초기값 선언
    name: string;
    age: number;
    // hobbies: string[]; // string[] -> 문자열의 배열로
    hobbies: any[]; // string, number 등 타입에 상관없이 배열,
    roles: any[];
    check: any;
} = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Movie', 'Picture', 1], // 만약 hobbies의 타입이 string이었다면 숫자 1은 오류
    roles: [2, 'author'],
    // check: 'READ',
    check: Role.ADMIN,
};

person.roles.push('admin'); // person의 role에 새로운 값을 넣는다
person.roles[1] = 10; // roles의 1 인덱스의 값을 10으로

console.log(person.name);
for(const hobby of person.hobbies) { // person의 hobbies만큼 for문 돌린다.
    console.log(hobby);
    // console.log(hobby.map()); // 에러, hobby.map is not a function
}

for(const role of person.roles) {
    console.log(role);
}

if(person.check === Role.ADMIN) console.log("Check True");

/*
Array - [1,2,3]
Tuple - [1,2] // added by TypeScript: Fixed-length array
Enum - enum {NEW, OLD}
any - all (*)
*/