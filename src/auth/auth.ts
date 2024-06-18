import prisma from "@/client/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { type Adapter } from '@auth/core/adapters'
import { UserRole } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"
import type { Provider } from 'next-auth/providers'
import GitHub from "next-auth/providers/github"

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
            newUser: '/api/auth/register',
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
        events: {
            createUser(message) {
                console.log("New user created: ")
                console.table(message.user)
            },
            signIn(message) {
                if (message.isNewUser) console.log(`Welcome ${message.user.email}`)

                console.table(message.user)
            },
            updateUser(message) {
                console.table(message.user)
            },
            signOut(message) {
                console.log("GoodBye, ", message)
            },
        },
        ...authConfig,

    })

const providers: Provider[] = authConfig.providers

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