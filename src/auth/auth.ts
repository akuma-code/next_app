import NextAuth, { DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import VK from "next-auth/providers/vk"
import { SignJWT, jwtVerify } from "jose"
import { User, UserRole } from "@prisma/client"
import { getOneUser } from "@/Services/userService"
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache"
import type { Provider } from 'next-auth/providers'



export type UserAuthPayload = {
    email: string
    password: string
    // role: UserRole
}

const apiVersion = "5.199"
export const { handlers, signIn, signOut, auth } = NextAuth(
    {
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


                    user = await getOneUser({ email: credentials.email! as string, }, { withPass: true })
                    if (!user || !user.email) {
                        console.error("User not found.")
                        return null
                    } else return user
                },
            }),
            GitHub,
            // VK({
            //     // authorization:"https://oauth.vk.com/authorize?client_id=51943581&redirect_uri=https://akumadev.vercel.app/avangard/events&scope=friends&response_type=code&v=5.199",
            //     authorization: `https://oauth.vk.com/access_token?client_id=51943581&client_secret=${process.env.VK_SECRET}v=${apiVersion}`,
            //     //   requestTokenUrl: `https://oauth.vk.com/access_token?v=${apiVersion}`,
            //     //   authorizationUrl: `https://oauth.vk.com/authorize?response_type=code&v=${apiVersion}`,
            //     //   profileUrl: `https://api.vk.com/method/users.get?fields=photo_100&v=${apiVersion}`,
            // })
        ],
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
        }

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