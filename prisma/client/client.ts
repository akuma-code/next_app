import { Pool } from 'pg'
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"


declare let global: { prisma: PrismaClient }
const pool = new Pool({ connectionString: process.env.POSTGRES_URL_NON_POOLING })
const adapter = new PrismaPg(pool)

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient({ adapter })
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({ adapter, log: [{ level: 'query', emit: 'event' }] })
    }
    prisma = global.prisma
}

export default prisma