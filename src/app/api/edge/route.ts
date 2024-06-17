import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

export const runtime = 'edge'

export async function GET(request: Request) {
    const pool = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
    const adapter = new PrismaPg(pool)
    //   const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
    //   const adapter = new PrismaPg(neon)
    const prisma = new PrismaClient({ adapter })

    const users = await prisma.user.findMany()

    return NextResponse.json(users, { status: 200 })
}