import { PrismaClient } from '@prisma/client'
declare let global: { prisma: PrismaClient }

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
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
export default prisma