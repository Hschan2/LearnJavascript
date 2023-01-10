/**
 * Redis 단기 집중 과정
 * Redis - 가장 널리 사용되는 캐싱 도구로 거의 모든 프로그래밍 언어와 함께 사용이 가능하다.
 * 웹의 상당 부분을 지원해 작동 방식의 이해가 필요하다.
 * 한 쌍의 Key-Value로 어루어져 있다.
 * 실제 대량 데이터베이스가 아닌 캐시 데이터베이스로 활용
 */

/**
 * Redis 명령어
 * quit - 종료
 * SET Key Value - Key값에 Value값을 저장
 * GET Key - Key값의 Value값 조회
 * DEL Key - Key값 삭제
 * EXISTS Key - Key값 존재 조회
 * KEYS * - 전체 Key값 조회
 * flushall - 전체 삭제
 * ttl Key - Key값의 만료 시간 조회
 * expire Key 시간 - Key값에 만료 시간을 부여
 * setex Key 시간 Value - Key값에 만료 시간을 부여
 */

/**
 * Lists
 * lpush Key Value - 왼쪽에 Key값에 Value값 추가
 * lrange Key 0 -1 - Key값의 목록 조회
 * rpush Key Value - 오른쪽에 Key값에 Value값 추가
 * LPOP Key - Key값의 맨 왼쪽 Value값 꺼내기
 * RPOP Key - Key값의 맨 오른쪽 Value값 꺼내기
 */

/**
 * Sets
 * SADD Key "Value" - Key값에 문자열 추가
 * SMEMBERS Key - Key값의 문자열 목록을 조회
 */

/**
 * Hashes
 * HSET Group Key Value - Group의 Key값에 Value값 저장
 * HGET Group Key - Group의 Key값 조회
 * HGETALL Group - Group 조회
 * HDEL Group Key - Group의 Key값 삭제
 * HEXISTS Group KEY - Group의 Key값 유무 조회
 */

/**
 * Node JS + Redis Example
 */

// Redis 사용 전
// 데이터 요청 시마다 걸리는 시간이 큼
const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get('/photos', async (req, res) => {
    const albumId = req.query.albumId
    const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/photos',
        { params: { albumId } }
    )

    res.json(data);
})

app.get('/photos/:id', async (req, res) => {
    const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
    )

    res.json(data);
})

app.listen(3000)

// Redis 사용 후
// 데이터를 처음 요청할 때를 제외하고 그 이후 요청의 시간은 짧음
// 약 400ms -> 30ms로 시간이 줄어드는 장점을 발견
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const Redis = require('redis')

const redisClient = Redis.createClient()

const DEFAULT_EXPIRATION = 3600

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get('/photos', async (req, res) => {
    const albumId = req.query.albumId
    const photos = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
        const { data } = await axios.get(
            'https://jsonplaceholder.typicode.com/photos',
            { params: { albumId } }
        )

        return data
    })

    res.json(photos)
})

app.get('/photos/:id', async (req, res) => {
    const photo = await getOrSetCache(`photos:${req.params.id}`, async () => {
        const { data } = await axios.get(
            'https://jsonplaceholder.typicode.com/photos',
            { params: { albumId } }
        )

        return data
    })

    res.json(photo);
})

function getOrSetCache(key, cb) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            if (error) reject(error)
            if (data != null) return resolve(JSON.parse(data))
            const freshData = await cb()
            redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
            resolve(freshData)
        })
    })
}

app.listen(3000)
