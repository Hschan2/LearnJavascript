// index.js
// Node JS + Redis
import redis from 'redis';
import fetch from 'node-fetch';
import express from 'express';

const USER_NAME = 'username';
const PORT = 5000;
const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT);
const app = express();

function formatOutput(username, nameOfRepos) {
    return `${username} has ${nameOfRepos} repos`;
}

// Github로부터 데이터 요청
async function getRepos(req, res) {
    try {
        const username = req.params[USER_NAME];
        const response = await fetch(`https://api.github.com/users/${username}`);
        const { public_repos } = await response.json();

        // Redis에 저장
        client.set(username, public_repos);
        // 키와 키에 맞는 데이터 한 쌍이 20초 내에 만료되기를
        client.setEx(username, 20, public_repos);
        res.send(formatOutput(username, public_repos));
    } catch (err) {
        console.error(err);
        res.status(404);
    }
}

function cache(req, res, next) {
    const username = req.params[USER_NAME];

    client.get(username, (err, data) => {
        if (err) throw err;

        // 데이터에 캐시되어 있거나 캐시에 이미 매시되어 있다면
        if (data !== null) {
            console.log('This data is already cached');
            // res.send 호출
            res.send(formatOutput(username, data));
        } else {
            console.log('This data is not cached');
            // 아니라면 캐시값 반환
            next();
        }
    });
}

app.get(`/repos/:${USER_NAME}`, cache, getRepos);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

// 실행
// GET -> https://localhost:5000/repos/andrew
// Redis-cli에서 확인
    // 조회 - kEYS *
    // 전체 삭제 - flushall
    // 만료 시간 조회, ttl [key]

// 장점
// 첫 번째 요청을 제외하고 그 이후에 요청은 빠른 속도로 요청이 가능