// * Shorthand Property Names *

{
    const first = {
        name: 'Hong',
        age: '20'
    }

    const name = 'Chan';
    const age = '25'

    // 변수 name, age의 값이 들어감
    const second = {
        name: name,
        age: age
    }

    // Key와 Value의 이름이 같을 경우, 축약 가능
    const first = {
        name,
        age,
    }
}

{
    const student = {
        name: 'Hong',
        level: 1,
    }

    {
        const name = student.name;
        const level = student.level;
        console.log(name, level);
    }

    // 아래처럼 축약 가능, 보통 같은 이름으로 선언해서 사용
    {
        const {name, level} = student;
        // const {name: studentName, level: studentLevel} = student; => 다른 이름으로 지정하는 것 가능
        console.log(name, level)
    }
}

const animals = ['tiger', 'dog']

{
    const first = animals[0];
    const second = animals[1];
    console.log(first, second);
}

// 아래처럼 축약 가능, first에 animals[0], second에 animals[1]
{
    const [first, second] = animals;
    console.log(first, second);
}


// * Spread Syntax *

{
    const obj1 = { key: 'key1' };
    const obj2 = { key: 'key2' };
    const array = [obj1, obj2];

    // 배열 복사 ([...array] => 참조한 값의 주소값 복사)
    // 수정 시, 모든 값이 변화 => 주의할 것
    const arrayCopy = [...array]; // array.map | array.for로 하는 방법 외
    console.log(array, arrayCopy);

    // 새로운 아이템 추가
    const arrayCopy2 = [...array, { key3: 'key3' }];

    // Object 복사
    const obj3 = { ...obj1 };

    // array concatenation (배열 묶음)
    const fruits1 = ['apple', 'banana'];
    const fruits2 = ['strawberry', 'orange'];
    const fruits = [...fruits1, ...fruits2];

    // object 통합
    // Key 값이 같은 object를 통합한다면 뒤에 있는 것이 앞에 있는 것을 덮어 씌움
    const dog1 = { dog1: 'korea dog' };
    const dog2 = { dog2: 'japan dog' };
    const fruits = {...dog1, ...dog2};
}


// * Default Parameters *

{
    {
        // 인자값이 전달되지 않을 때 if문으로 설정하는 것은 이전 방법
        function printMessage(message) {
            if(message == null) {
                message = 'default message';
            }
            console.log(message);
        }

        printMessage('hello');
        printMessage();
    }

    {
        // 인자값이 전달되지 않을 때 새로운 방법
        function printMessage(message = 'default message') {
            console.log(message);
        }

        printMessage('hello');
        printMessage();
    }
}


// * Ternary Operator *

{
    const isCat = true;
    // 이전 방법
    {
        let component;
        if(isCat) {
            component = 'cat';
        } else {
            component = 'dog';
        }
        console.log(component);
    }

    // 새로운 방법
    {
        const component = isCat ? 'cat' : 'dog';
        console.log(component);
    }
}


// * Template Literals

{
    const weather = 'sunny';
    const temparature = '16';

    // 이전 방법
    console.log(
        'Today weather is ' + weather + ' and temparature is ' + temparature
    );

    // 새로운 방법
    console.log(
        `Today weather is ${weather} and temparature is ${temparature}`
    );
}


// ES11
// * Optional Chining

{
    const person1 = {
        name: 'Hong',
        job: {
            title: 'S/W',
            manager: {
                name: 'Bob',
            },
        },
    };

    const person2 = {
        name: 'Bob',
    };

    // 이전 방법
    {
        function printManager(person) {
            console.log(person.job.manager.name);
        }
        printMessage(person1);
        printMessage(person2); // Job이 없기 때문에 에러
    }

    function printManager(person) {
        console.log(
            person.job
                ? person.job.manager
                    ? person.job.manager.name
                    : undefined
                : undefined
        );
    }
    printMessage(person1);
    printMessage(person2);

    // 새로운 방법 (Optional Chaining)
    function printManager(person) {
        console.log(person.job?.manager?.name); // job이 있으면 manager가 있으면 name 출력
    }
    printMessage(person1);
    printMessage(person2); // Job이 없기 때문에 에러
}


// * Nullish Coalescing Operator *

{
    // 이전 방법
    {
        const name = 'Hong';
        const userName = name || 'Guest'; // || = 앞에 있는 값이 False일 때만 뒤에 있는 값 출력
        console.log(userName); // Hong
    }

    {
        const name = null;
        const userName = name || 'Guest';
        console.log(userName); // Guest
    }

    // 아무런 이름을 사용하고 싶지 않을 때도 Guest가 발생하는 문제
    {
        const name = '';
        const userName = name || 'Guest';
        console.log(userName); // Guest
    }

    // 0을 할당하여도 Undefined이 발생하는 문제
    {
        const num = 0;
        const message = num || 'Undefined';
        console.log(message); // Undefined
    }

    // 새로운 방법 (Nullish Coalescing)
    {
        const name = '';
        const userName = name ?? 'Guest'; // name에 아무런 값이 없다면 Guest 출력
        console.log(userName);
    }

    {
        const num = 0;
        const message = num ?? 'Undefined'; // num에 아무런 값이 없다면 Undefined 출력
        console.log(message);
    }
}