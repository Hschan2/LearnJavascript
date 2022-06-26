"use strict";
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role[Role["READ_ONLY"] = 10] = "READ_ONLY";
    Role[Role["AUTHOR"] = 20] = "AUTHOR";
})(Role || (Role = {}));
; // 입력한 순서대로 인덱스 설정. ADMIN => 0, READ_ONLY => 1, AUTHOR => 2, 초기값 설정은 이름 그대로
var person = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Movie', 'Picture', 1],
    roles: [2, 'author'],
    // check: 'READ',
    check: Role.ADMIN,
};
person.roles.push('admin'); // person의 role에 새로운 값을 넣는다
person.roles[1] = 10; // roles의 1 인덱스의 값을 10으로
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) { // person의 hobbies만큼 for문 돌린다.
    var hobby = _a[_i];
    console.log(hobby);
    // console.log(hobby.map()); // 에러, hobby.map is not a function
}
for (var _b = 0, _c = person.roles; _b < _c.length; _b++) {
    var role = _c[_b];
    console.log(role);
}
if (person.check === Role.ADMIN)
    console.log("Check True");
/*
Array - [1,2,3]
Tuple - [1,2] // added by TypeScript: Fixed-length array
Enum - enum {NEW, OLD}
any - all (*)
*/ 
