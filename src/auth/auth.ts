
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient, UserRole } from "@prisma/client"
import NextAuth, { DefaultSession, User } from "next-auth"
import { JWTOptions, type JWT } from 'next-auth/jwt'
import type { Provider } from 'next-auth/providers'

import authConfig from './auth.config'
import prisma from "@/client/client"
import { testGetUser } from "@/Services/userService"
import { AdapterUser } from "@auth/core/adapters"
import { randomBytes, randomUUID } from "crypto"


export type UserAuthPayload = {
    email: string
    password: string
    // role: UserRole
}

const apiVersion = "5.199"
export const { handlers, signIn, signOut, auth, } = NextAuth(
    {
        adapter: PrismaAdapter(prisma),
        ...authConfig,
        session: {
            strategy: "jwt",
            // Seconds - How long until an idle session expires and is no longer valid.
            maxAge: 30 * 24 * 60 * 60, // 30 days

            // Seconds - Throttle how frequently to write to database to extend a session.
            // Use it to limit write operations. Set to 0 to always update the database.
            // Note: This option is ignored if using JSON Web Tokens
            // updateAge: 24 * 60 * 60, // 24 hours

            // The session token is usually either a random UUID or string, however if you
            // need a more customized session token string, you can define your own generate function.
            // generateSessionToken: () => {
            //     return randomUUID?.() ?? randomBytes(32).toString("hex")
            // }

        },
        pages: {
            signIn: '/api/auth/login',
            newUser: '/api/auth/register',

        },
        // theme: { brandColor: "#aaaccc", colorScheme: "dark" },
        // trustHost: true,
        debug: true,
        callbacks: {
            async signIn() {
                return true
            },


            async jwt({ token, user, account }) {
                // if (trigger === 'update') {
                //     console.log("Updated user: ")
                //     console.table(session)
                //     console.table(token)

                // }
                if (account) {
                    // First login, save the `access_token`, `refresh_token`, and other
                    // details into the JWT

                    // const userProfile: User = {
                    //     id: token.sub,
                    //     name: token?.name,
                    //     email: token?.email,
                    //     image: token?.picture,
                    //     role: user.role
                    // }

                    // token = {
                    //     ...token,
                    //     access_token: account.access_token!,
                    //     expires_at: account.expires_at!,
                    //     refresh_token: account.refresh_token!,
                    //     user: userProfile,
                    // }

                }
                if (user) { // User is available during sign-in

                    await testGetUser(user.email)
                        .then(u => token.userId = u?.id)

                    token.user = user
                    token.role = user.role
                    token.name = user.name
                    token.email = user.email

                    return token
                }


                // if (Date.now() > Number(token.expires_at) * 1000) {
                //     console.log("success", { expires: Number(token.expires_at) * 1000 })
                //     // Subsequent logins, if the `access_token` is still valid, return the JWT
                //     return token
                // }
                // console.log("jwt returns: \n", { token })
                return token
            },
            async session({ session, token, }) {

                // if (trigger) {
                //     session.sessionToken === token.refresh_token
                // }
                // session.sessionToken = token.refresh_token
                session.user.role = token.role as UserRole
                session.user.name = token.name
                session.user_id = token.userId



                // console.log("session returns \n", { session })
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
            session(message) {
                console.log("session fires: ")
                console.log({ session: message.session })
                console.log("tokenUser: ")
                console.log({ user: message.token.user })
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
declare module "next-auth/jwt" {
    interface JWT {
        access_token: string
        expires_at: number
        refresh_token: string
        error?: "RefreshAccessTokenError"
        user: AdapterUser | User
        userId?: number | null
    }
}
declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        // db_id?: number
        id?: string
        userId?: number | null
        role?: string
        name?: string | null
        password?: string
        // emailVerified?: number | null

    }

    interface Session {

        user_id?: number | null
        user: {
            // userId?: number | null
            // db_id?: number
            id?: string
            role: string
            name?: string | null
            password?: string
            // emailVerified?: number | null
            //      By default, TypeScript merges new interface properties and overwrites existing ones.
            //      In this case, the default session user properties will be overwritten,
            //      with the new ones defined above. To keep the default session user properties,
            //      you need to add them back into the newly declared interface.

        } & DefaultSession["user"]

    }




}

