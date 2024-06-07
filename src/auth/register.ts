'use server'

import { UserRole } from "@prisma/client"
import { validateEmail } from "./validator"
import prisma from "@/client/client"
import { createUser } from "@/Services/userService"

export async function registerUser(email: string, password: string, role = UserRole.GUEST) {
    const verifiedEmail = validateEmail(email)
    if (!verifiedEmail) {
        throw new Error("Email is not valid")
    }


    const existUser = await prisma.user.findUnique({ where: { email: verifiedEmail } })
    if (existUser) throw new Error("Email already in use, try another")


    return await createUser(verifiedEmail, password, role)

}
