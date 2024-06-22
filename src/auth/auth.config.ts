// 'use server'
import prisma from "@/client/client"
import { getOneUserByEmail } from "@/Services/userService"
import { P_UserCreateArgs, UserPersonalData } from "@/Types"
// import { User } from "@prisma/client"
import { hash, hashSync } from "bcrypt"
import { NextAuthConfig, type User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import github from "next-auth/providers/github"
async function getUserByEmail({ email }: { email: string }) {
    let user = await prisma.user.findFirst({
        where: { email }, select: {
            email: true,
            // id: true,
            name: true,
            password: true,
            image: true,
            role: true
        }
    })
    if (!user) return null
    // const result = { ...user, db_id: user.id, id: user.id.toString() }

    return user
}
export default {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", },
                password: { label: "Пароль", type: "password" }
            },

            name: "email",
            type: "credentials",
            authorize: async (credentials, req) => {
                let user: null | User = null
                user = await getUserByEmail({ email: credentials.email as string, })
                if (!user) {
                    console.error(`________Юзверь с мылом ${credentials.email} не найден______`)
                    return null
                }
                const db_pass = user.password
                // console.log({ db_pass, c_pass: credentials.password })
                // const c_pass = await hash(credentials.password as string, 5)
                const isPassCorrect = db_pass === credentials.password as string
                if (!isPassCorrect) {
                    console.log({ db_pass }, "not equal!")
                    return null
                }

                return user

            },

        }),
        // github,

    ],
} satisfies NextAuthConfig


