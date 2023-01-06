# GraphQL + Apollo Server
Apollo 서버를 이용해서 GraphQL 데이터 베이스를 어떻게 활용할 수 있는지 파악합니다. 실제로 데이터를 직접 삽입, 수정, 삭제, 읽기를 해보며 GraphQL의 동작 과정을 이해하는 것을 목표합니다.   

<br/>

## 내용
* gql`...` 로 작성해야 한다.
* ```type Query{}```는 기본으로 사용되어야 한다.
* ```type Mutation{}```는 데이터를 이용해야 할 때 사용한다. 예를 들어, 저장, 수정, 삭제 등을 할 때 사용한다.
* ```!```는 필수로 있어야 한다는 것을 의미한다.
* ```[id!]!```는 필수로 List로 되어야 하고 <b>id</b>를 필수로 가지고 있어야 한다는 것을 의미한다.

```
직접 입력하는 방식

(Operation)
mutation {
    postTweet(text: "I'm new Tweet!", userId: "1") {
        id
        text
    }
}

자동으로 입력하는 방식

(Operation)
mutation($text: String!, $userId: ID!) {
  postTweet(text: $text, userId: $userId) {
    text
    id
  }
}

(Variables)
{
  "text": "new One!!",
  "userId": "1"
}
```

* ```Resolvers```는 실제 작업할 쿼리를 사용할 코드를 작성하는 장소를 의미한다.
* ```Resolvers``` 안의 함수는 type 명을 사용하고 type 내 선언한 옵션 이름도 그대로 사용해야 한다.
* ```tweet(root, args)```에서 인자는 기본적으로 <b>root(항상 첫 번째)</b>가 있고 그 다음 인자는 내가 원하는 <b>args</b>로 넘긴다.
* 두 번째 인자 <b>args</b>는 내가 보낸 인자를 말한다. 예, ID
* {id}는 id 값을 사용하겠다는 의미
* 예를 들어, <b>firstName</b>과 <b>lastName</b>을 합친 <b>fullName</b>을 ```Resolvers```에서 처리할 때. 이를 ```Dynamic Field```라고 한다.
* 예를 들어, ```fullName(root, ...)```에서 root에는 <b>fullName</b>을 <b>"호출"</b>하는 ```User 오브젝트```가 있다.
* ```fullName({firstName, lastName})```는 root에서 저장되어 있는 오브젝트에서 firstName과 lastName을 가져오겠다는 의미이다.

```
type User {
        id: ID!
        firstName: String!
        lastName: String!
        fullName: String!
    }

User: {
        fullName({firstName, lastName}) {
            return `${firstName} ${lastName}`;
        }
    }
```

* ```""" """```로 Document에서 출력할 설명을 작성할 수 있다.
* RestAPI에서 GraphQL로 이주할 때, JSON 파일에서 사용할 오브젝트를 선언하고 처리한다.

```
type Movie {
        id: Int!
        url: String!
        imdb_code: String!
        title: String!
        title_english: String!
        title_long: String!
        slug: String!
        year: Int!
        rating: Float!
        runtime: Float!
        genres: [String]!
        summary: String
        description_full: String!
        synopsis: String
        yt_trailer_code: String!
        language: String!
        background_image: String!
        background_image_original: String!
        small_cover_image: String!
        medium_cover_image: String!
        large_cover_image: String!
      }
```

* Resolvers에서 ID 값을 가져와 데이터를 처리할 수 있다.

```
const resolvers = {
  Query: {
    movie(_, { id }) {
      return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
                .then((res) => res.json())
                .then((json) => json.data.movie);
    },
  }
}
```

* ```Subscription```는 실시간 처리를 도와준다. 데이터에 이벤트가 발생할 경우 실시간으로 처리 및 작업한다.
  * ```type Subscription {}```으로 타입을 선언하고 ```Subscription: {}```로 Resolvers에 작업을 처리한다.