
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
        ...authConfig,
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
                if (user) { // User is available during sign-in

                    token.user = user
                    token.role = user.role
                    token.name = user.name
                    token.email = user.email
                    // token.db_id = user.db_id
                    console.log("______token get userdata", { token })
                    // return token
                }
                // if (account) {
                //     // First login, save the `access_token`, `refresh_token`, and other
                //     // details into the JWT

                //     const userProfile: User = {
                //         id: token.sub,
                //         name: profile?.name,
                //         email: profile?.email,
                //         image: token?.picture,
                //         role: user?.role
                //     }

                // token = {
                //     ...token,
                //     access_token: account.access_token,
                //     expires_at: account.expires_at,
                //     refresh_token: account.refresh_token,
                //     user: userProfile,
                // }

                // }

                if (Date.now() < Number(token.expires_at) * 1000) {
                    console.log("success")
                    // Subsequent logins, if the `access_token` is still valid, return the JWT
                    return token
                }
                console.log("jwt returns: \n", { token })
                return token
            },
            async session({ session, token, user }) {
                session.user.role = token.role as UserRole
                session.user.name = token.name
                const u = token.user as User
                session.user.id = u.id!



                console.log("session returns \n", { session })
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
        // db_id?: number
        id?: string
        role?: string
        name?: string | null
        password?: string

    }
    interface JWT {
        access_token: string
        expires_at: number
        refresh_token: string
        error?: "RefreshAccessTokenError"
        user: User
    }
    interface Session {
        user: {
            // db_id?: number
            id?: string
            role: string
            name?: string | null
            password?: string
            //      By default, TypeScript merges new interface properties and overwrites existing ones.
            //      In this case, the default session user properties will be overwritten,
            //      with the new ones defined above. To keep the default session user properties,
            //      you need to add them back into the newly declared interface.

        } & DefaultSession["user"]
        jwt: {
            access_token: string
            expires_at: number
            refresh_token: string
            error?: "RefreshAccessTokenError"
            user: User
        }
    }




}

declare module "next-auth" {
    interface JWT {
        access_token: string
        expires_at: number
        refresh_token: string
        error?: "RefreshAccessTokenError"
    }
}