'use server'

import prisma from "@/client/client"
import { User } from "@prisma/client"
import { Payload } from "@prisma/client/runtime/library"
import bcrypt from "bcrypt"
import { signIn } from "./auth"
// import { signIn } from "next-auth/react"


export async function login(prev: any, payload: FormData) {
    const { email, password } = Object.fromEntries(payload) as { email: string, password: string }
    const user = await prisma.user.findUnique({ where: { email }, select: { email: true, password: true, id: true, role: true, name: true } })
    const err = {
        message: ""
    }
    if (!user) {
        err.message = "User not found"

        return err
    }


    try {

        await signIn('credentials', payload)


    } catch (error) {
        throw error
    }
}