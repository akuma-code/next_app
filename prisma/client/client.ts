import { Pool } from 'pg'
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"



const pool = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })


export default prisma