import { Prisma, User } from "@prisma/client"
import prisma from "../../../prisma/client/client"
type UserFindVariant = { nickname: string } | { id: string }
export const createUser = async (payload: { nickname: string, password: string }) => {

    const verifiedUserData = {
        data: validateCreateFields(payload.nickname, payload.password)
    }
    const new_user = await prisma.user.create({
        data: validateCreateFields(payload.nickname, payload.password),
        include: { UserSession: true }
    })
    return new_user
}

export const deleteUser = async (payload: { nickname: string }) => {
    const user = findUser(payload.nickname)
    const t_find = prisma.user.findFirst({ where: user })
    if (!t_find) {
        console.log(`user ${user.nickname} not found!`)
        throw new Error(`user ${user.nickname} not found!`)
    }

    const t_del = prisma.user.delete({ where: user })
    return await prisma.$transaction([t_find, t_del])
}


export const editUser = async (whereFilter: UserFindVariant, new_data: Partial<User>) => {
    const user = await prisma.user.findFirst({ where: whereFilter })
    if (!user) {
        throw new Error(`user  not found!`)
    }

    const t_update = prisma.user.update({ where: whereFilter, data: new_data })
    return await prisma.$transaction([t_update])
}

const validateCreateFields = (
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