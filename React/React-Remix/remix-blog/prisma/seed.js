// 11. Database Seeder
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
    // await Promise.all(
    //     getPosts().map(post => {
    //         return db.post.create({ data: post })
    //     })
    // )
    const john = await prisma.user.create({
        data: {
            username: 'john',
            // 비밀번호 Hash
            passwordHash: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u'
        },
    })

    await promises.all(
        getPosts().map((post) => {
            const data = { userId: john.id, ...post }
            return prisma.post.create({ data })
        })
    )
}

seed()

function getPosts() {
    return [
        {
            title: 'Javascript',
            body: 'Javascript Description'
        },
        {
            title: 'Typescript',
            body: 'Typescript Description'
        },
        {
            title: 'SpringBoot',
            body: 'SpringBoot Description'
        },
        {
            title: 'Remix Framework',
            body: 'Remix Framework Description'
        },
        {
            title: 'NextJS Framework',
            body: 'NextJS Framework Description'
        },
    ]
}