// 12. DB File
import { PrismaClient } from "@prisma/client";

let db: PrismaClient

declare global {
    // 있으면 PrismaClient 없으면 undefined
    var __db: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
    db = new PrismaClient()
    db.$connect()
} else {
    if (!global.__db) {
        global.__db = new PrismaClient()
        global.__db.$connect()
    }
    db = global.__db
}

export { db }