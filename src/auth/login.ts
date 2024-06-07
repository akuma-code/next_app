'use server'

import prisma from "@/client/client"
import { User } from "@prisma/client"
import { Payload } from "@prisma/client/runtime/library"
import bcrypt from "bcrypt"

export async function login(payload: FormData) {
    const { email, password } = Object.fromEntries(payload) as { email: string, password: string }
    const user = await prisma.user.findUnique({ where: { email }, select: { email: true, password: true, id: true, role: true } })

    if (!user) throw new Error("User not found")


    const pwHash = await bcrypt.hash(password, 5)
    const isPasswordCorrect = await bcrypt.compare(user.password, pwHash)

    if (!isPasswordCorrect) throw new Error("Password incorrect!!")

    const result = {
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    }
    return result
}