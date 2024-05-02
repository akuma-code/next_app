'use server'
import { Prisma, User, UserRoles } from "@prisma/client"
import prisma from "../../../prisma/client/client"
type UserFindVariant = { nickname: string } | { uuid: string }
interface CreateUserPayload {
    nickname: string
    password: string
    role?: string
}

export const createUser = async (payload: CreateUserPayload) => {
    const { nickname, password, role = 'guest' } = payload;

    const verifiedUserData = validateCreateFields(nickname, password, role as UserRoles)

    const new_user = await prisma.user.create({
        data: {
            ...verifiedUserData,
        }, include: { session: true }
        // select: {
        //     id: true,
        //     nickname: true,
        //     role: true,
        //     session: true,

        // }
    })
    return new_user
}

export const deleteUser = async (payload: { nickname: string }) => {
    const { nickname } = payload
    const user = await findUser(nickname)
    const t_find = await prisma.user.findUnique({ where: { nickname } })
    if (!t_find) {
        console.log(`user ${user.nickname} not found!`)
        throw new Error(`user ${user.nickname} not found!`)
    }

    const t_del = prisma.user.delete({ where: { uuid: t_find.uuid } })
    return t_del
    // return await prisma.$transaction([t_find, t_del])
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
    role: UserRoles

) => {
    return Prisma.validator<Prisma.UserCreateInput>()({
        nickname,
        password,
        role

    })
}

const findUser = (nickname: string) => {
    return Prisma.validator<Prisma.UserWhereInput>()({
        nickname
    })
}