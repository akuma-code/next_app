
import { getUserByEmail } from "@/Services/userService"
// import { User } from "@prisma/client"
import { NextAuthConfig, type User } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const config = {
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




export default config