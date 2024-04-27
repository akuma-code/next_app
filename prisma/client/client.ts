import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const userNickName = Prisma.validator<Prisma.UserSelect>()({
    nickname: true
})

const createUser = (
    nickname: string,
    password: string,

) => {
    return Prisma.validator<Prisma.UserCreateInput>()({
        nickname,
        password,

    })
}

const findUser = (nickname: string) => {
    return Prisma.validator<Prisma.UserWhereInput>()({
        nickname
    })
}
export default prisma