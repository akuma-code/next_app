import { getOneUser } from "@/Services/userService"
import { User } from "@prisma/client"
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
                } else return user
            },
        }),
        github,

    ],
} satisfies NextAuthConfig