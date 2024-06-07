'use server'

import { validateEmail, validateRole } from "@/auth/validator";
import prisma from "@/client/client"
import { _log } from "@/Helpers/helpersFns";
import { User, UserRole } from "@prisma/client";
import { Payload } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache";

export async function getOneUser(payload: { email: string }) {
    const u = prisma.user


    const { email } = payload;

    const verifiedEmail = validateEmail(email)
    if (!verifiedEmail) {
        throw new Error("Email is not valid")
    }
    try {
        const user = await u.findUnique({ where: { email: verifiedEmail }, select: { email: true, role: true } })
        return user


    } catch (e) {
        _log(e)
        throw new Error("Find user error")
    }
}

export async function registerUser(email: string, password: string, role = UserRole.GUEST) {
    const verifiedEmail = validateEmail(email)
    if (!verifiedEmail) {
        throw new Error("Email is not valid")
    }


    const existUser = await prisma.user.findUnique({ where: { email: verifiedEmail } })
    if (existUser) throw new Error("Email already in use, try another")


    return await createUser(verifiedEmail, password, role)

}



export async function createUser(email: string, password: string, role = UserRole.GUEST) {
    const verifiedEmail = validateEmail(email)

    if (!verifiedEmail) {
        throw new Error("Email is not valid")
    }


    const existUser = await prisma.user.findUnique({ where: { email: verifiedEmail } })
    if (existUser) throw new Error("Email already in use, try another")


    try {
        const pwHash = await bcrypt.hash(password, 5)
        const user = await prisma.user.create({
            data: {
                email: verifiedEmail,
                password: pwHash,
                role: role
            },
            select: {
                email: true,
                role: true,
                id: true
            }
        })

        console.table(user)
        return user
    } catch (e) {
        _log(e)
        throw new Error("create user error")
    } finally {
        revalidatePath('/')
    }
}