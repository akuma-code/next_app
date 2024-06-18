
import { PrismaAdapter } from "@auth/prisma-adapter"
import { type Adapter } from '@auth/core/adapters'
import { Prisma, PrismaClient, UserRole } from "@prisma/client"
import NextAuth, { DefaultSession, type User } from "next-auth"
import type { Provider } from 'next-auth/providers'
import GitHub from "next-auth/providers/github"

import authConfig from './auth.config'

const prisma = new PrismaClient()
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
            signIn: '/api/auth/login',
            newUser: '/api/auth/register',

        },
        debug: true,
        callbacks: {
            async jwt({ token, user, trigger, account, profile }) {
                // if (trigger === 'update') {
                //     console.log("Updated user: ")
                //     console.table(user)
                //     console.table(token)
                // }
                if (account) {
                    // First login, save the `access_token`, `refresh_token`, and other
                    // details into the JWT

                    const userProfile: User = {
                        id: token.sub,
                        name: profile?.name,
                        email: profile?.email,
                        image: token?.picture,
                        role: user.role
                    }

                    return {
                        access_token: account.access_token,
                        expires_at: account.expires_at,
                        refresh_token: account.refresh_token,
                        user: userProfile,
                    }
                }
                else if (Date.now() < Number(token.expires_at) * 1000) {
                    // Subsequent logins, if the `access_token` is still valid, return the JWT
                    return token
                }
                if (user) { // User is available during sign-in
                    token.role = user.role
                    token.name = user.name
                    token.email = user.email
                    token.user = user


                }
                return { ...token, }
            },
            async session({ session, token, user }) {
                session.user.role = token.role as UserRole
                session.user.name = token.name

                // console.log({ session, token })
                return session
            },

        },
        events: {
            createUser(message) {
                console.log("events fires: create")
                console.log("New user created: ")
                console.table(message.user)
            },
            signIn(message) {
                if (message.isNewUser) console.log(`Welcome ${message.user.email}`)
                console.log("events fires: in")
                console.table(message.user)
            },
            updateUser(message) {
                console.log("events fires: update")
                console.table(message.user)
            },
            signOut(message) {
                console.log("events fires: out")
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
// declare module "next-auth/jwt" {
//     interface JWT {
//         access_token: string
//         expires_at: number
//         refresh_token: string
//         error?: "RefreshAccessTokenError"
//     }
// }
declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        role: string
        name?: string | null
    }
    interface Session {
        user: {
            id: number
            role: string
            name?: string | null
            //      By default, TypeScript merges new interface properties and overwrites existing ones.
            //      In this case, the default session user properties will be overwritten,
            //      with the new ones defined above. To keep the default session user properties,
            //      you need to add them back into the newly declared interface.

        } & DefaultSession["user"]
    }
    interface JWT {
        access_token: string
        expires_at: number
        refresh_token: string
        error?: "RefreshAccessTokenError"
    }

}

