# Remix
## Nested Routing
React의 Remix 프레임워크의 가장 큰 장점은 ```Nested Route```를 제공한다는 것이다. 이는 파일 시스템에 있는 <b>폴더 - 파일 명칭</b>을 기반으로 Route를 부분적으로 실행할 수 있는 기능을 말한다.   

예를 들어 routes/index.tsx라는 파일이 있다면 URL 상에서는 ```https://service.com```이 되고 routes/jokes.jsx은 URL 상에서 ```https://service.com/jokes```에 접근했을 때 결과이다. 이 상황에서 jokes 안에 렌더링이 될 항목들은 모두 jokes 폴더 안에 넣어주면 된다.   

```routes/jokes/index.tsx```는 앞선  ```https://service.com/jokes```에 해당하고 ```routes/jokes/$jokeId.tsx```는 URL 뒤에 ```https://service.com/jokes/some-random-id```와 같이 세부적인 항목으로 들어갔을 때 사용된다.   

위와 같이 렌더링을 원할 경우, <b>Outlet</b> 컴포넌트를 사용한다. 이를 통해 해당 부분에 필요한 데이터를 동적으로 사용이 가능하다.   

## 서버와 클라이언트 코드를 유기적으로
Remix 프레임워크는 서버와 클라이언트 코드를 유기적으로 사용이 가능하다. 대표적으로 ```loader```와 ```action```이 있다. 서버에서 데이터를 가져와 렌더링을 하고 싶다면 ```loader```를 렌더하면 된다.   

```
예시.

export let loader: LoaderFunction = async () => {
  let jokeListItems = await db.joke.findMany({
    take: 5,
    select: { id: true, name: true },
    orderBy: { createdAt: "desc" },
  });
  let data: LoaderData = { jokeListItems };
  return data;
};
```

그리고 이를 사용하는 클라이언트는 ```useLoaderData``` Hook을 사용하여 별도의 Loading Indicator 혹은 useEffect를 사용하지 않아도 데이터를 바로 사용할 수 있다.   

```
let data = useLoaderData<LoaderData>();
```

언제나 페이지를 접근했을 때 실행되는 ```loader```와 달리 ```action```은 유저가 <b>GET</b>, <b>POST</b>, <b>PUT</b>, <b>DELETE</b>와 같은 액션을 수행했을 때 실행된다. 즉, <b>Form</b>이 Submit이 되는 항목이 호출되었을 때 실행되어 서버 사이드에서 처리가 필요한 코드를 실행 처리해줄 수 있다.   

```
예시.

export let action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  let form = await request.formData();
  let name = form.get("name");
  let content = form.get("content");

  let joke = await db.joke.create({
    data: { name, content },
  });
  return redirect(`/jokes/${joke.id}`);
};
```

## 간편한 폼 유효성 검사
Remix 프레임워크에는 유기적으로 서버와 클라이언트 사이에 유효성 검사를 할 수 있는 것, 유효성 검사를 하기 위한 로직을 공유할 수 있다는 점의 장점이 있다.   

```
예시.

export let action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  let form = await request.formData();
  let name = form.get("name");
  let content = form.get("content");

  let fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return { fieldErrors, fields: { name, content } };
  }

  let joke = await db.joke.create({
    data: { name, content },
  });
  return redirect(`/jokes/${joke.id}`);
};
```

위 처럼 코드를 작성하면 Submit에 실패했을 시, <b>fieldError</b>를 클라이언트에 내려주면 된다.   

그리고 이를 사용할 때는 다음와 같다.   

```
<div>
  <label>
    Name:{" "}
    <input
      type="text"
      defaultValue={actionData?.fields?.name}
      name="name"
      aria-invalid={Boolean(actionData?.fieldErrors?.name) || undefined}
      aria-describedby={
        actionData?.fieldErrors?.name ? "name-error" : undefined
      }
    />
  </label>
  {actionData?.fieldErrors?.name ? (
    <p className="form-validation-error" role="alert" id="name-error">
      {actionData.fieldErrors.name}
    </p>
  ) : null}
</div>
```

또한, 유효성 검사 로직도 공유가 가능하다. (데이터 베이스 접근 케이스에는 어려움이 발생할 수 있다.)   

```
function validateJokeName(name: string) {
  if (name.length < 3) {
    return "Joke name must be at least 3 characters long";
  }
}
function validateJokeContent(content: string) {
  if (content.length < 10) {
    return "Joke content must be at least 10 characters long";
  }
}
```

## 진행 상황
* 회원 서비스
* 포스트 작성

## 메모
* 영어 동영상 강의로 내용에 대한 이해가 부족. 복습이 필수

[React-Remix 강의](https://www.youtube.com/watch?v=d_BhzHVV4aQ)