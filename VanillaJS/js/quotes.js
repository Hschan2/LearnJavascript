const quotes = [
    {
        quote: "삶이 있는 한 희망은 있다 - ",
        author: "키케로"
    },
    {
        quote: "그래도 지구는 돈다 - ",
        author: "갈릴레오 갈릴레이"
    },
    {
        quote: "내 사전에 불가능이란 단어는 없다 - ",
        author: "나폴레옹 보나파르트"
    },
    {
        quote: "소년이여, 야망을 가져라 - ",
        author: "윌리엄 스미스 클라크"
    },
    {
        quote: "피할 수 없으면 즐겨라 - ",
        author: "로버트 엘리엇"
    },
    {
        quote: "자신을 내보여라. 그러면 재능이 드러날 것이다 - ",
        author: "발타사르 그라시안"
    },
    {
        quote: "인간의 삶 전체는 단지 한 순간에 불과하다. 인생을 즐기자 - ",
        author: "플루타르코스"
    },
    {
        quote: "겨울이 오면 봄이 멀지 않으리 - ",
        author: "셸리"
    },
    {
        quote: "길을 잃는 다는 것은 곧 길을 알게 된다는 것이다 - ",
        author: "동아프리카 속담"
    },
    {
        quote: "문제점을 찾지 말고 해결책을 찾으라 - ",
        author: "헨리포드"
    },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerHTML = todaysQuote.quote;
author.innerHTML = todaysQuote.author;