import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import VK from "next-auth/providers/vk"
import { SignJWT, jwtVerify } from "jose"
import { User, UserRole } from "@prisma/client"
import { getOneUser } from "@/Services/userService"
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache"
import type { Provider } from 'next-auth/providers'
import prisma from "@/client/client"
import authConfig from './auth.config'


export type UserAuthPayload = {
    email: string
    password: string
    // role: UserRole
}

const apiVersion = "5.199"
export const { handlers, signIn, signOut, auth, } = NextAuth(
    {
        adapter: PrismaAdapter(prisma),
        session: { strategy: "jwt" },
        pages: {
            // signIn: '/api/auth/signin',
            newUser: '/api/auth/register'
        },
        // debug: true,
        callbacks: {
            jwt({ token, user, trigger }) {
                if (trigger === 'update') {
                    console.log("Updated user: ")
                    console.table(user)
                    console.table(token)
                }
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
        // events: {
        //     createUser(message) {
        //         console.log("New user created: ")
        //         console.table(message.user)
        //     },
        //     signIn(message) {
        //         if (message.isNewUser) console.log(`Welcome ${message.user.email}`)
        //         console.table(message.user)
        //     },
        //     updateUser(message) {
        //         console.table(message.user)
        //     },
        //     signOut(message) {
        //         console.log("GoodBye, ", message)
        //     },
        // },
        ...authConfig,

    })

const providers: Provider[] = [GitHub]

export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
        const providerData = provider()
        return { id: providerData.id, name: providerData.name }
    } else {
        return { id: provider.id, name: provider.name }
    }
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