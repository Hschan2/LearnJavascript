// What is the object?

// object = {key: value}

const obj1 = {}; // object literal
const obj2 = new Object(); // object constructor

function print(person) {
    console.log(person.name);
    console.log(person.age);
}

const hong = { // 클래스가 없어도 바로 object 설정 가능
    name: 'hong',
    age: 4,
}

print(hong);

hong.hasJob = true; // hong 오브젝트에서 hasJob을 만들고 값을 true로
console.log(hong.hasJob);

delete hong.hasJob;
console.log(hong.hasJob); // undefined -> 삭제되었기 때문에

// 2. Computed properties

console.log(hong.name);
console.log(hong['name']); // hong[name]는 에러, hong['name'] -> 정확하게 어떤 key가 필요한지 모를 때
hong['hasJob'] = true;
console.log(hong.hasJob);

function printValue(obj, key) {
    console.log(obj[key]);
}
printValue(hong, 'name');
printValue(hong, 'age');

// 3. Property value shorthand
const person1 = {name: 'hong', age: 2};
const person2 = {name: 'seong', age: 3};
const person3 = {name: 'chan', age: 4};
const person4 = makePerson('hong', 3);

console.log(person4); // Object {name: "hong", age: 3}, name key에 hong 값을 넣고 age key에 3 값을 넣는다

function makePerson(name, age) {
    return {
        name,
        age,
    }
}

// 4. Constructor Function

const person5 = new Person('hong', 3);

function Person(name, age) {
    this.name = name;
    this.age = age;
}

console.log(person5);

// 5. in operator: property existence check (dey in obj)

console.log('name' in hong); // hong 오브젝트에 name이 있나? => true
console.log('age' in hong);
console.log('random' in hong); // hong 오브젝트에 random이 있나? => false

// 6. for..in vs for..of
// for(key in obj) {}
for(key in hong) {
    console.log(key); // name age hasJob
}

// for(value of iterable) {}
const array = [1, 2, 4, 5];
for(value of array) console.log(value); // 결과 => 1 2 4 5.  let i=0;i<array.length;i++과 같다

// 7. fun cloning
// object.assign(dest, [obj1, obj2, obj3])
const user = {
    name: 'hong',
    age: '20',
};
const user2 = user;
user2.name = 'chan';
console.log(user);
console.log(user2); // user를 참조하기 때문에 user의 name값도 바뀐다

// old way, 참조하는 방식이 아닌 복사하는 방식
const user3 = {};
for(key in user) { // key => name, key
    user3[key] = user[key];
}
user3.name = 'seong';
console.log(user3);

// 다른 방식이 object.assign
const user4 = Object.assign({}, user);
// Object.assign(user4, user) // 첫번째 인자는 target, 두번째 인자는 복사할 값. 값에는 배열도 가능
user4.name = 'hi';
console.log(user4);

// 다른 예제
const fruit1 = {
    color: 'red',
};
const fruit2 = {
    color: 'blue',
    size: 'big',
}
const mixed = Object.assign({}, fruit1, fruit2); // fruit1이 먼저 복사가 되고 fruit2가 나중에 덮어씌어주기 때문에 fruit2가 최종적으로 복사
console.log(mixed.color); // blue
console.log(mixed.size); // big