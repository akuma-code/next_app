import { PrismaClient } from '@prisma/client'
declare let global: { prisma: PrismaClient }

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient({ log: [{ level: 'query', emit: 'event' }] })
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({ log: [{ level: 'query', emit: 'event' }] })
    }
    prisma = global.prisma
}
// const userNickName = Prisma.validator<Prisma.UserSelect>()({
//     nickname: true
// })

// const createUser = (
//     nickname: string,
//     password: string,

// ) => {
//     return Prisma.validator<Prisma.UserCreateInput>()({
//         nickname,
//         password,

//     })
// }

// const findUser = (nickname: string) => {
//     return Prisma.validator<Prisma.UserWhereInput>()({
//         nickname
//     })
// }
// prisma.$on('info' as never, (e: any) => console.log(e))
export default prisma