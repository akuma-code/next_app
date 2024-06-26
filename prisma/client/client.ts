import { Pool } from 'pg'
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"


declare let global: { prisma: PrismaClient }
const pool = new Pool({ connectionString: process.env.POSTGRES_URL_NON_POOLING })
const adapter = new PrismaPg(pool)

// let prisma: PrismaClient
// if (process.env.NODE_ENV === 'production') {
//     prisma = new PrismaClient({ adapter })
// } else {
//     if (!global.prisma) {
//         global.prisma = new PrismaClient({ adapter, log: [{ level: 'query', emit: 'event' }] })
//     }
//     prisma = global.prisma
// }
const prismaClientSingleton = () => {
    return new PrismaClient({ adapter })
    // .$extends(withAccelerate());
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
export default prisma