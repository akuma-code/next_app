'use server'

import prisma from "@/client/client"
import { createUserWithProfile } from "@/Services/userService"
import { hashPass } from "./utils"
import { validateEmail } from "./validator"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function registerUser(payload: { email: string, password: string, name?: string }) {
    const { email, password, name } = payload;


    const verifiedEmail = validateEmail(email)
    if (!verifiedEmail) {
        console.error("Email is not valid")
        // return null
        throw new Error()
    }


    const existUser = await prisma.user.findUnique({ where: { email: verifiedEmail } })
    if (existUser) {
        console.error("Email already in use, try another")

        return
    }

    const pwHash = await hashPass(password)
    const user = await createUserWithProfile({ email: verifiedEmail, password, name })
    // redirect(`/admin/user/profile/${user.id}`)

}


export async function registerAction(prevdata: any, data: FormData) {
    const { email, password, name } = Object.fromEntries(data) as { email: string, password: string, name?: string }
    try {

        await registerUser({ email, password, name })
    } catch (error) {
        const { message } = error as { message: string }
        return { message }
    } finally {
        revalidatePath("/")
    }



}