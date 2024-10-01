
import { getUserByEmail } from "@/Services/userService"
// import { User } from "@prisma/client"
import { AuthError, NextAuthConfig, type User } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const config = {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", },
                password: { label: "Пароль", type: "password" },
            },

            name: "email",
            type: "credentials",
            // id: "Credentials",
            authorize: async (credentials, req) => {
                let user: null | User = null
                user = await getUserByEmail({ email: credentials.email as string, })
                if (!user) {
                    console.error(`\n________Юзверь с мылом ${credentials.email} не найден______\n`)
                    return null
                }
                const db_pass = user.password

                const isPassCorrect = db_pass === credentials.password as string
                if (!isPassCorrect) {
                    console.log({ db_pass }, "not equal!")
                    throw new AuthError("\n\nНеверный пароль!!\n\n")
                }


                return user


            },

        }),
        // github,

    ],
} satisfies NextAuthConfig




export default config