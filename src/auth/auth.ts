
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import NextAuth, { DefaultSession, User } from "next-auth"
import { JWTOptions, type JWT } from 'next-auth/jwt'
// import type { Provider } from 'next-auth/providers'

import prisma from "@/client/client"
import { AdapterUser } from "@auth/core/adapters"
import { Provider } from "@auth/core/providers"
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
            error: '/api/auth/error'

        },
        // theme: { brandColor: "#aaaccc", colorScheme: "dark" },
        // trustHost: true,
        // debug: true,
        callbacks: {
            // async signIn({ user, email, credentials, }) {
            //     console.table(credentials)
            //     if (!user.userId) return true
            //     redirect(`/profile/${user.userId}`)
            // },


            async jwt({ token, user, }) {
                // if (trigger === 'update') {
                //     console.log("Updated user: ")
                //     console.table(session)
                //     console.table(token)

                // }
                // if (account) {
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

                // }
                // const c = cookies().getAll()
                if (user) { // User is available during sign-in


                    token.user = user
                    token.role = user.role
                    token.name = user.name
                    token.email = user.email
                    // token.settings = { ...user?.settings }
                    token.userId = user.userId
                    // c.set('stoken', token.sub!)
                    // return token
                    // await getUserByEmail({ email: user.email! })
                    //     .then(u => ({
                    //         ...token, userId: u?.id,
                    //         settings: u?.settings ? u?.settings : { theme: 'light', view: 'card' }
                    //     }))
                }


                // console.log("🚀 ~ jwt ~ token:", token)

                // console.log("🚀 ~ jwt ~ c:", c)

                // console.log("jwt returns: \n", { token })



                // if (Date.now() > Number(token.expires_at) * 1000) {
                //     console.log("success", { expires: Number(token.expires_at) * 1000 })
                //     // Subsequent logins, if the `access_token` is still valid, return the JWT
                //     return token
                // }
                return token
            },
            async session({ session, token }) {

                // if (trigger) {
                //     session.sessionToken === token.refresh_token
                // }
                if (token.sub) session.sessionToken = token.sub
                session.user.role = token.role as UserRole
                session.user.name = token.name
                session.user_id = token.userId
                // session.settings = token.settings
                // token.sub && await cookies().set('token', token.sub)


                // console.log("session returns \n", { session })
                // console.log({ token })
                return session
            },
            authorized({ auth: session, request: { nextUrl } }) {
                const isLoggedIn = !!session?.user;
                console.log("auth: ", session)
                const s = nextUrl.hostname
                console.log({ s })
                if (isLoggedIn) return true
                return false
            },

        },
        events: {
            createUser(message) {
                console.log("events fires: create")
                console.log("New user created: ")
                console.table(message.user)
            },
            signIn(message) {
                if (message.user) console.log(`Welcome ${message.user.email}`)
                console.log("events fires: in")
                console.table(message.user)
                // console.table(message.profile)
                console.table(message.account)

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
                // console.log("session fires: ")
                // console.log({ token: message.token })
                // console.log("tokenUser: ")
                // console.log({ session: message.session })
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
        settings: Record<string, string> | null
    }
}
declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        // db_id?: number
        // id?: number
        userId?: number | null
        role?: string
        name?: string | null
        password?: string

        settings?: {
            theme: string,
            view: string

        }
        // emailVerified?: number | null

    }

    interface Session extends DefaultSession {

        user_id?: number | null
        settings: Record<string, string> | null
        user: {
            settings: Record<string, string> | null

            // id?: number
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

