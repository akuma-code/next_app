'use server'

import { validateEmail, validateRole } from "@/auth/validator";
import prisma from "@/client/client"
import { _log } from "@/Helpers/helpersFns";
import { User, UserRole } from "@prisma/client";
import { Payload } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache";

export async function getOneUser(payload: { email: string }, options?: { withPass?: boolean }) {
    const u = prisma.user


    const { email } = payload;

    try {
        const user = await u.findUnique({
            where: { email },
            select: {
                email: true,
                role: true,
                password: !!options?.withPass
            }
        })
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


    // const existUser = await prisma.user.findUnique({ where: { email: verifiedEmail } })
    const existUser = await getOneUser({ email })
    if (existUser) throw new Error("Email already in use, try another")


    return await createUser(verifiedEmail, password, role)

}



export async function createUser(email: string, password: string, role: UserRole = UserRole.GUEST) {
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

type UserSearchId = {
    type: 'id'
    search: number
}
type UserSearchEmail = {
    type: 'email'
    search: string
}

type UserSearchParam = UserSearchEmail | UserSearchId
export async function updateUser(q: UserSearchParam, _data: { role?: UserRole, password?: string }) {


    try {
        switch (q.type) {
            case "email": {
                const { search } = q;

                const user = await prisma.user.update({
                    where: { email: search }, data: {
                        ..._data
                    }, select: {
                        email: true,
                        id: true,
                        role: true,
                        password: !!_data.password,
                    }
                })
                return user
            }
            case "id": {
                const { search } = q;

                const user = await prisma.user.update({
                    where: { id: search }, data: {
                        ..._data
                    }, select: {
                        email: true,
                        id: true,
                        role: true,
                        password: !!_data.password,
                    }
                })
                return user
            }
            default: throw new Error("Query invalid")
        }




    } catch (error) {
        _log(error)
        throw new Error("____update user error")
    } finally {
        _log("data changed: ", _data)
        revalidatePath('/')
    }
}


export async function setAdmin(email: string) {
    return await updateUser({ type: 'email', search: email }, { role: 'ADMIN' })
}
