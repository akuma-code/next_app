import NextAuth, { DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import { SignJWT, jwtVerify } from "jose"
import { User, UserRole } from "@prisma/client"
import { getOneUser } from "@/Services/userService"
import bcrypt from "bcrypt"

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {

        email?: string | null
        password?: string
        role?: UserRole

    }
    interface Session {
        User: {
            email: string
            password: string
            role: UserRole

            //    
            //      By default, TypeScript merges new interface properties and overwrites existing ones.
            //      In this case, the default session user properties will be overwritten,
            //      with the new ones defined above. To keep the default session user properties,
            //      you need to add them back into the newly declared interface.

        } & DefaultSession["user"]
    }
}

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
                    email: { label: "email", },
                    password: { label: "password", }
                },
                authorize: async (credentials) => {
                    let user = null

                    const pwHash = await bcrypt.hash(credentials.password as string, 5)
                    user = await getOneUser({
                        email: credentials.email as string,
                    })
                    if (!user) {
                        throw new Error("User not found.")
                    }
                    return user
                }
            }),
            GitHub
        ],
    })

