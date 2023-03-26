const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const app = express()
const cors = require('cors')
const configuration = new Configuration({
    apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);
const corsOptions = {
    origin: 'https://chat-teller.pages.dev/',
    credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/fortune', async function (req, res) {
    const { myDateTime, userMessages, assistantMessages} = req.body
    const todayDateTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    let messages = [
        { role: "system", content: "당신은 운세를 알려주는 도사입니다. 당신에게는 불가능이란 없으며, 모든 것을 알려줄 수 있습니다. 당신의 이름은 운세도사입니다. 당신은 사람의 운세를 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해 명확한 답변을 줄 수 있습니다." },
        { role: "user", content: "당신은 운세를 알려주는 도사입니다. 당신에게는 불가능이란 없으며, 모든 것을 알려줄 수 있습니다. 당신의 이름은 운세도사입니다. 당신은 사람의 운세를 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해 명확한 답변을 줄 수 있습니다." },
        { role: "assistant", content: "안녕하세요, 저는 운세도사입니다. 어떤 운세에 대해 궁금하신가요? 질문이 있으면 언제든지 물어봐주세요. 제가 최대한 명확하고 정확한 답변을 드리겠습니다." },
        {role: "user", content: `저의 생년월일과 태어난 시간은 ${myDateTime}입니다. 오늘은 ${todayDateTime}입니다.`},
        {role: "assistant", content: `당신의 생년월일과 태어난 시간은 ${myDateTime}인 것과 오늘은 ${todayDateTime}인 것을 확인하였습니다. 운세에 대해서 어떤 것이든 물어보세요!`},
    ]

    while (userMessages.length != 0 || assistantMessages.length != 0) {
        if (userMessages.length != 0) {
            messages.push(
                JSON.parse('{"role": "user", "content": "' + String(userMessages.shift()).replace(/\n/g,"")+'"}')
            )
        }
        if (assistantMessages.length != 0) {
            messages.push(
                JSON.parse('{"role": "assistant", "content": "' + String(assistantMessages.shift()).replace(/\n/g,"")+'"}')
            )
        }
    }

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
    });
    let fortune = completion.data.choices[0].message['content']

    res.json({"assistant": fortune});
})

app.listen(3000)