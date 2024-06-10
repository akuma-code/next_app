import NextAuth, { DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import { SignJWT, jwtVerify } from "jose"
import { User, UserRole } from "@prisma/client"
import { getOneUser } from "@/Services/userService"
import bcrypt from "bcrypt"



export type UserAuthPayload = {
    email: string
    password: string
    // role: UserRole
}
export const { handlers, signIn, signOut, auth } = NextAuth(
    {
        providers: [
            Credentials({
                credentials: {
                    email: { label: "Email", },
                    password: { label: "Пароль", type: "password" }
                },
                name: "Email",
                type: "credentials",
                authorize: async (credentials) => {
                    let user: null | Pick<User, 'email' | 'password' | 'role'> = null

                    const pwHash = await bcrypt.hash(credentials.password as string, 5)
                    user = await getOneUser({ email: credentials.email as string, }, { withPass: true })
                    if (!user) {
                        console.error("User not found.")
                        return null
                    } else return user
                },


            }),
            GitHub
        ],
        debug: true,
        callbacks: {
            jwt({ token, user }) {
                if (user) { // User is available during sign-in
                    token.role = user.role
                }
                return token
            },
            session({ session, token }) {
                session.user.role = token.role as UserRole
                return session
            },
        },
    })



declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {


        role: string

    }
    interface Session {
        user: {
            id: number
            role: string
            //      By default, TypeScript merges new interface properties and overwrites existing ones.
            //      In this case, the default session user properties will be overwritten,
            //      with the new ones defined above. To keep the default session user properties,
            //      you need to add them back into the newly declared interface.

        } & DefaultSession["user"]
    }

}