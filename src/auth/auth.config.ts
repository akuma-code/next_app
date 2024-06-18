import { getOneUser } from "@/Services/userService"
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
            // type: "credentials",
            authorize: async (credentials) => {
                let user: null | Required<Pick<User, 'email' | 'password' | 'role'>> = null
                user = await getOneUser({ email: credentials.email as string, }, { withPass: true })
                if (!user) {
                    console.error("User not found.")
                    return null
                } else {
                    const db_pass = user.password
                    const c_pass = await hash(credentials.password as string, 5)
                    const isPassCorrect = db_pass === c_pass
                    if (!isPassCorrect) {
                        console.log({ db_pass, c_pass }, "not equal!")
                        return null
                    } else return user
                }
                return null
            },
        }),
        github,

    ],
} satisfies NextAuthConfig