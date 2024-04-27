import { User } from "@prisma/client"
import prisma from "../../../prisma/client/client"

export const SignupFormShemaValidate = (fields: {
    nickname: string
    password: string

}) => {
    const hasUser = () => getUser(fields.nickname).then((user) => {
        console.log('user: ', user)
        return true
    }, (err) => {
        console.log(err)
        return false
    })
    return hasUser()
}

async function getUser(nick: string): Promise<User | null> {
    try {
        const user = await prisma.user.findUnique({ where: { nickname: nick } })
        return user
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}