import { getOneUserByEmail } from "@/Services/userService"
import { P_UserCreateArgs, UserPersonalData } from "@/Types"
import { User } from "@prisma/client"
import { hash, hashSync } from "bcrypt"
import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import github from "next-auth/providers/github"

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
                let user: null | UserPersonalData = null
                user = await getOneUserByEmail({ email: credentials.email as string, }, { withPass: true })
                if (!user) {
                    console.error(`Юзверь с мылом ${credentials.email} не найден`)
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
        github,

    ],
} satisfies NextAuthConfig