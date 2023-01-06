# 견고한 Node 프로젝트 아키텍처 설계하기

## 3계층 설계 (3 Layer Architecture)
관심사 분리 원칙을 적용하기 위해 비즈니스 로직을 Node의 API Routes와 분리한다.   

```
Controller <-> Service Layer <-> Data Access Layer
```
개발 중에 반복작업이 생길 때면 CLI 도구를 통해 비즈니스 로직을 사용하게 된다. 그리고 Node의 Server에서 API를 호출하는 것을 지양하는 것이 좋다.   

```
Express Route Controller <-> Service Class <-> Mongoose ODM
```

### 비즈니스 로직을 Controller에서 넣지 않기
비즈니스 로직을 Controller에 넣는다면 나중에 꼬인 코드가 될 것이다.   

아래 코드는 하지 말아야 할 코드 작성 중 하나이다.
```
route.post('/', async (req, res, next) => {

  // 미들웨어이거나 조이와 같은 라이브러리에 의해 처리되어야 한다.
  const userDTO = req.body;
  const isUserValid = validators.user(userDTO)
  if(!isUserValid) {
    return res.status(400).end();
  }

  // 많은 비즈니스 로직이 여기에
  const userRecord = await UserModel.create(userDTO);
  delete userRecord.password;
  delete userRecord.salt;
  const companyRecord = await CompanyModel.create(userRecord);
  const companyDashboard = await CompanyDashboard.create(userRecord, companyRecord);

  ...

  // 모든 것을 엉망으로 만드는 최적화
  // 응답은 클라이언트에게
  res.json({ user: userRecord, company: companyRecord });

  // 코드 실행 계속
  // 모델 생성
  const salaryRecord = await SalaryModel.create(userRecord, companyRecord);
  eventTracker.track('user_signup',userRecord,companyRecord,salaryRecord);
  intercom.createUser(userRecord);
  gaAnalytics.event('user_signup',userRecord);
  await EmailService.startSignupSequence(userRecord)
});
```

### Service 계층에 비즈니스 로직 넣기
비즈니스 로직은 Service 계층에 작성해야 한다. 분명한 목적이 있는 클래스들의 집합이며, Solid 원칙을 Node에 적용한다. 그러나 <b>SQL Query</b> 형태의 코드가 있어서는 안 된다. 이는 <b>Data Access Layer</b>에서 작성되어야 한다.   

* 코드를 Express Router에서 분리하기
* Service Layer에는 Req와 Res 객체를 전달하지 않기
* 상태 코드 또는 헤더와 같은 Http 전송 계층과 관련된 것 반환 금지   

코드 예시.
```
route.post('/', 
  validators.userSignup, // 유효성 검사
  async (req, res, next) => {
    // Route 실제 책임 변수
    const userDTO = req.body;

    // Service Layer 요청
    // 데이터, 비즈니스 로직 액세스 추상화
    const { user, company } = await UserService.Signup(userDTO);

    // 응답 반환
    return res.json({ user, company });
  });
```

Service Layer에서 동작하는 코드 예시.
```
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';

export default class UserService() {

  async Signup(user) {
    const userRecord = await UserModel.create(user);
    // 데이터 베이스에서 userRecord 필요
    const companyRecord = await CompanyModel.create(userRecord);
    // 생성된 유저, 컴퍼니에 의존
    const salaryRecord = await SalaryModel.create(userRecord, companyRecord);

    ...

    await EmailService.startSignupSequence(userRecord)

    ...

    return { user: userRecord, company: companyRecord };
  }
}
```
[자세한 내용](https://github.com/santiq/bulletproof-nodejs)

### Pub / Sub 계층 사용하기
이는 매우 유용하게 사용할 수 있다. 간단한 Node API 앤드포인트에서 사용자를 생성하고 Third-Party 서비스를 호출하거나 서비스 분석을 시도하거나 이메일 전송과 같은 작업을 할 수 있다.   

간단한 <b>Create</b> 작업이 여러 가지 일을 하고 하나의 함수 안에 많은 줄의 코드가 생길 것이다. 이는 단일 책임 원칙을 위배한다.   

이를 방지하기 위해 시작부터 책임들을 분리하여 간결하게 코드를 유지하고 관리할 수 있다.   

```
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';

export default class UserService() {

  async Signup(user) {
    const userRecord = await UserModel.create(user);
    const companyRecord = await CompanyModel.create(user);
    const salaryRecord = await SalaryModel.create(user, salary);

    eventTracker.track(
      'user_signup',
      userRecord,
      companyRecord,
      salaryRecord
    );

    intercom.createUser(
      userRecord
    );

    gaAnalytics.event(
      'user_signup',
      userRecord
    );
    
    await EmailService.startSignupSequence(userRecord)

    ...

    return { user: userRecord, company: companyRecord };
  }

}
```

독립적인 서비스들을 직접적으로 호출하는 것은 최선의 방법은 아니다. 이보다 더 좋은 방법은 이벤트를 발생시키는 것이다. 그리고 리스너들이 역할을 대신 책임지게 된다.   

```
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';

export default class UserService() {

  async Signup(user) {
    const userRecord = await this.userModel.create(user);
    const companyRecord = await this.companyModel.create(user);
    
    this.eventEmitter.emit('user_signup', { user: userRecord, company: companyRecord })

    return userRecord
  }
}
```

그리고 이벤트 핸들러와 리스너들은 여러 파일로 나눌 수 있게 된다.

```
eventEmitter.on('user_signup', ({ user, company }) => {

  eventTracker.track(
    'user_signup',
    user,
    company,
  );

  intercom.createUser(
    user
  );

  gaAnalytics.event(
    'user_signup',
    user
  );
})
eventEmitter.on('user_signup', async ({ user, company }) => {
  const salaryRecord = await SalaryModel.create(user, company);
})
eventEmitter.on('user_signup', async ({ user, company }) => {
  await EmailService.startSignupSequence(user)
})
```

```
eventEmitter.on('user_signup', async ({ user, company }) => {
  const salaryRecord = await SalaryModel.create(user, company);
})
```

```
eventEmitter.on('user_signup', async ({ user, company }) => {
  await EmailService.startSignupSequence(user)
})
```
( await 구문을 try-catch block으로 감싸거나, unhandledPromise를 process.on('unhandledRejection', cb) )로 처리할 수 있다. [자세한 내용](https://softwareontheroad.com/nodejs-crash-exception-handler/)   

### 의존성 주입 (제어 역전)
이는 코드를 구조화하는 데 많이 사용하는 패턴이다. 생성자를 통해 클래스와 함수의 의존성을 전달해주는 방식이다.   

이를 통해 <b>호환 가능한 의존성</b>을 주입함으로써 유연하게 코드를 유지할 수 있다. 이는 Service에 대한 유닛 테스트를 작성하거나, 다른 Context에서 코드를 사용할 때 큰 도움이 된다.   

* 의존성 주입을 사용하지 않을 때   
```
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';

class UserService {
  constructor(){}
  Sigup(){
    // userMode, CompanyModel 등 요청
    ...
  }
}
```

* 의존성 주입을 사용할 때   
```
export default class UserService {
    // 의존성 주입
  constructor(userModel, companyModel, salaryModel){
    this.userModel = userModel;
    this.companyModel = companyModel;
    this.salaryModel = salaryModel;
  }

  getMyUser(userId){
    // this로 모델 사용 가능
    const user = this.userModel.findById(userId);
    return user;
  }
}
```

직접 의존성을 주입해서 사용할 수도 있다.   
```
import UserService from '../services/user';
import UserModel from '../models/user';
import CompanyModel from '../models/company';

const salaryModelMock = {
  calculateNetSalary(){
    return 42;
  }
}

const userServiceInstance = new UserService(userModel, companyModel, salaryModelMock);
const user = await userServiceInstance.getMyUser('12346');
```

그러나 서비스가 가질 수 있는 종속성의 양은 무한하며 새로운 인스턴스를 추가할 때, 서비스의 모든 인스턴스화를 리팩토링하는 것은 오류가 발생하기 쉽다. 이러한 이유로 의존성 주입 프레임워크가 생기게 되었다.   

필요한 의존성만 사용하는 사람이 직접 클래스를 선언하면 되고 해당 클래스의 인스턴스가 필요할 때면 <b>Service Locator</b>를 호출하면 된다.   

Node에 의존성을 사용할 수 있게 해주는 라이브러리 typeDi를 살펴보기로 한다. [typeDi 사용법](https://github.com/typestack/typedi)   

* 경고! Typescript 예시 코드   
```
import { Service } from 'typedi';

@Service()
export default class UserService {
  constructor(
    private userModel,
    private companyModel, 
    private salaryModel
  ){}

  getMyUser(userId){
    const user = this.userModel.findById(userId);
    return user;
  }
}
```
typeDi는 UserService에 필요한 모든 종속성을 해결해준다. 잘못된 Service Locator 호출은 좋지 않은 패턴이다.

### Node의 Express에서 의존성 주입 사용
의존성 주입을 Express에 사용하는 것이 마지막 관문이다.   

```
route.post('/', 
  async (req, res, next) => {
    const userDTO = req.body;

    const userServiceInstance = Container.get(UserService) // Service locator

    const { user, company } = userServiceInstance.Signup(userDTO);

    return res.json({ user, company });
  });
```

### 유닛 테스트
이러한 구조를 유지하고 의존성 주입을 사용하게 된다면 유닛 테스트를 간단하게 실행할 수 있다. 그리고 Req / Res 객체들과 Require 호출들을 할 필요가 없어진다.   

* 유저 가입을 위한 유닛 테스트 (tests/unit/services/user.js)   
```
import UserService from '../../../src/services/user';

describe('유저 서비스 유닛 테스트', () => {
  describe('가입', () => {
    test('유저 레코드 생성하고 가입 이벤트 내보내기', async () => {
      const eventEmitterService = {
        emit: jest.fn(),
      };

      const userModel = {
        create: (user) => {
          return {
            ...user,
            _id: 'mock-user-id'
          }
        },
      };

      const companyModel = {
        create: (user) => {
          return {
            owner: user._id,
            companyTaxId: '12345',
          }
        },
      };

      const userInput= {
        fullname: 'User Unit Test',
        email: 'test@example.com',
      };

      const userService = new UserService(userModel, companyModel, eventEmitterService);
      const userRecord = await userService.SignUp(teamId.toHexString(), userInput);

      expect(userRecord).toBeDefined();
      expect(userRecord._id).toBeDefined();
      expect(eventEmitterService.emit).toBeCalled();
    });
  })
})
```

### 스케줄링 및 반복 작업
비즈니스 로직이 Service Layer에 캡슐화되고 이는 스케줄링 작업(Cron Jobs)들을 더욱 하기 쉽게 만들어준다.   

코드 실행을 지연시키는 작업들을 할 때는 절대로 Node의 setTimeout이나 다른 원시적인 방법(Primitive Way)을 사용하는 것은 좋지 않다. 대신 데이터 베이스에서 작업을 유지하고 실행하는 프레임워크를 사용해야 한다.   

이 방식으로 실패한 작업을 제어하고 성공한 작업들로부터 피드백을 받을 수 있다. [자세한 내용](https://softwareontheroad.com/nodejs-scalability-issues/)

### 설정 및 시크릿 파일
Node에서 API Key와 데이터 베이스 연결과 관련된 설정들을 저장하는 가장 좋은 방법은 <b>dotenv</b>를 사용하는 것이다.   

다만 ```.env``` 파일을 만들되 절대 커밋하지 않는 것이 좋다. (그러나 Repository에 기본 값들로 채워져 있어야 한다.) 그리고 dotenv는 .env 파일을 로드하여 안에 있는 값들을 Node의 ```precess.env``` 객체에 대입한다.   

여기까지만 해도 충분하지만 추가적인 단계를 위해 ```config/index.ts``` 파일에서 dotenv가 .env 파일을 로드하고, 객체를 사용하여 변수들을 저장한다. 이를 통해 코드 구조화를 할 수 있고, 자동 완성을 사용할 수 있다.   

* config/index.js
```
const dotenv = require('dotenv');
// config()로 .env 파일을 읽기, 내용 parse, process.env로 할당
dotenv.config();

export default {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URI,
  paypal: {
    publicKey: process.env.PAYPAL_PUBLIC_KEY,
    secretKey: process.env.PAYPAL_SECRET_KEY,
  },
  paypal: {
    publicKey: process.env.PAYPAL_PUBLIC_KEY,
    secretKey: process.env.PAYPAL_SECRET_KEY,
  },
  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY,
    sender: process.env.MAILCHIMP_SENDER,
  }
}
```
이렇게 사용함으로써 ```process.env.MY_RANDOM_VAR``` 명령어들이 난무해지는 것을 막을 수 있다. 그리고 코드 자동 완성을 이용해 env 변수명들의 이름을 다시 확인하지 않아도 된다.   

### Loaders
이 패키지는 사람마다 사용하는 유무가 다르다. 이는 Node 서비스의 시작 프로세스를 테스트 가능한 모듈로 나누는 것이다.   

* Express app
```
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorhandler = require('errorhandler');
const app = express();

app.get('/status', (req, res) => { res.status(200).end(); });
app.head('/status', (req, res) => { res.status(200).end(); });
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json(setupForStripeWebhooks));
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: process.env.SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

require('./config/passport');
require('./models/user');
require('./models/company');
app.use(require('./routes'));
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});


...

...

...

async function startServer() {    
  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

// 서버 실행하기
startServer();
```
코드에서 볼 수 있듯이 지저분하게 코드가 작성되어 있는 것을 알 수 있다.   

```
const loaders = require('./loaders');
const express = require('express');

async function startServer() {

  const app = express();

  await loaders.init({ expressApp: app });

  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

startServer();
```
목적을 가지고 있는 작은 파일들을 가진 loaders로 이용함으로써 코드의 길이를 줄일 수 있다.   

* loaders/index.js   
```
import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Intialized');
  await expressLoader({ app: expressApp });
  console.log('Express Intialized');

  // ... 더 많은 내용의 loaders

  // ... Agenda 실행
  // ... Redis나 다른 작업들
}
```

* loaders/express.js
```
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

export default async ({ app }: { app: express.Application }) => {

  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
  app.enable('trust proxy');

  app.use(cors());
  app.use(require('morgan')('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));

  // ...미들웨어

  // express app 반환
  return app;
})
```

* loaders/mongoose.js
```
import * as mongoose from 'mongoose'

export default async (): Promise<any> => {
  const connection = await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
  return connection.connection.db;
}
```

## 결론
* 3계층 구조를 사용하기 (3 Layer Architecture)
* 비즈니스 로직을 Express의 Controller에 넣지 않기
* 백그라운드 작업을 할 때, Pub / Sub 패턴을 사용하고 이벤트를 발생하기
* 의존성 주입 사용하기
* 비밀번호, Secrets와 API Key들을 절대 노출하지 않고 Configuration Manager를 사용하기
* Node Server 설정 파일을 작은 모듈로 분리하여 독립적으로 로드하기   

[예제](https://github.com/santiq/bulletproof-nodejs)   

[Node 프로젝트 아키텍처 설계](https://velog.io/@hopsprings2/%EA%B2%AC%EA%B3%A0%ED%95%9C-node.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0)