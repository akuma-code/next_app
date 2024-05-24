import { Pool } from 'pg'
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"



const pool = new Pool({ connectionString: process.env.DATABASE_URL_PG })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })


export default prisma