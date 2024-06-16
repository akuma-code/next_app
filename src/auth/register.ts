'use server'

import { UserRole } from "@prisma/client"
import { validateEmail } from "./validator"
import prisma from "@/client/client"
import { createUser } from "@/Services/userService"
import { hashPass } from "./utils"
import { redirect } from "next/navigation"

export async function registerUser(payload: { email: string, password: string }) {
    const { email, password } = payload;


    const verifiedEmail = validateEmail(email)
    if (!verifiedEmail) {
        console.error("Email is not valid")
        // return null
        throw new Error()
    }


    const existUser = await prisma.user.findUnique({ where: { email: verifiedEmail } })
    if (existUser) {
        console.error("Email already in use, try another")
        // return null
        return
    }

    const pwHash = await hashPass(password)
    return await createUser(verifiedEmail, pwHash)

}


export async function registerAction(prevdata: any, data: FormData) {
    const { email, password } = Object.fromEntries(data) as { email: string, password: string }
    const validEmail = validateEmail(email)
    if (validEmail !== false) await registerUser({ email: validEmail, password })
    else return { message: "Email incorrect" }


}