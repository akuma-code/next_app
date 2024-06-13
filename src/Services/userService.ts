'use server'

import { validateEmail, validateRole } from "@/auth/validator";
import prisma from "@/client/client"
import { _log } from "@/Helpers/helpersFns";
import { Prisma, User, UserRole } from "@prisma/client";
import { Payload } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache";
type GetOnePayload = { id: string, } | { email: string }
export async function getUser(payload: GetOnePayload, options?: { withPass?: boolean }) {
    const u = prisma.user
    try {

        if ('id' in payload) {
            const { id } = payload;
            const user = await u.findUnique({
                where: { id: Number(id) },
                select: {
                    email: true,
                    role: true,
                    password: !!options?.withPass,
                    profile: true,
                }
            })

            return user
        } else {
            const { email } = payload;
            const user = await u.findUnique({
                where: { email },
                select: {
                    email: true,
                    role: true,
                    password: !!options?.withPass,
                    profile: true,
                }
            })
            return user
        }


    } catch (e) {
        _log(e)
        throw new Error("Find user error")
    }
}
export async function getOneUser(payload: { email: string }, options?: { withPass?: boolean }) {
    const u = prisma.user


    const { email } = payload;

    try {



        const user = await u.findUnique({
            where: { email },
            select: {
                email: true,
                role: true,
                password: !!options?.withPass,
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

export async function createUserWithProfile(user_data: Prisma.UserCreateInput, profile_data?: Partial<Prisma.ProfileCreateInput>) {
    const { email, password, role } = user_data

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
                role: role,
                profile: {
                    create: {
                        ...profile_data
                    }
                }
            },
            select: {
                email: true,
                role: true,
                id: true,
                profile: true,
                password: true
            }
        })
        // if (profile_data) {
        //     const p = await prisma.profile.create({
        //         data: {
        //             name: profile_data.name,
        //             userId: user.id,
        //         },

        //     })
        //     await prisma.user.update({
        //         where: { id: user.id },
        //         data: {
        //             profile: {
        //                 connect: p
        //             }
        //         }
        //     })
        //     console.table(p)
        // }

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
                        ..._data,

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

export async function getAllUsers<T extends keyof User & string>(options?: { select?: T[], pass?: boolean }) {
    const pass = options?.pass
    if (options?.select !== undefined) {

        const selectfields = options.select.reduce((acc, field) => {
            const res: Record<string, boolean> = {
                [`${field}`]: true
            }
            let accum: typeof res = {}
            accum[field] = true
            return accum
        }, {} as Record<string, boolean | undefined>)
        console.table(await prisma.user.findMany({ select: selectfields }))
    }
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            profile: true,
            role: true,
            password: !!pass
        },
    })

    return users
}