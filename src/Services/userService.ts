'use server'

import { hashPass } from "@/auth/utils";
import { validateEmail } from "@/auth/validator";
import prisma from "@/client/client";
import { _log } from "@/Helpers/helpersFns";
import { Prisma, UserRole } from "@prisma/client";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
type GetOnePayload = { id: string, } | { email: string }

export type RSelectFields<T, P> = T extends keyof P & string ? T[] : never
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

export async function deleteUser(id: number) {
    const u = await prisma.user.delete({ where: { id } })
    console.log("deleted user: ", u)
    revalidatePath('/')

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
    const name = profile_data?.name



    const verifiedEmail = validateEmail(email)

    if (!verifiedEmail) {
        throw new Error("Email is not valid")
    }


    const existUser = await prisma.user.findUnique({ where: { email: verifiedEmail } })
    if (existUser) throw new Error("Email already in use, try another")


    try {
        const pwHash = await hashPass(password)
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
export async function updateUser(q: UserSearchParam, _data: Prisma.UserUpdateInput) {


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


const selectfields = <T extends { [x: string]: any }>(fields: (keyof T & string)[]) => fields.reduce((acc, field) => {

    // let accum = {} as Record<keyof T & string, boolean>
    acc[field] = true

    return acc
}, {} as Record<string, boolean | undefined>)

// type UserSelectFields = keyof Prisma.UserSelect
// export async function getAllUsers<T extends UserSelectFields>(options?: { select?: T[], log?: boolean }) {

//     if (options?.select) {

//         const _selected: Prisma.UserSelectScalar = selectfields(options.select)
//         const _users = await prisma.user.findMany({ select: _selected })
//         console.table(_users)
//         return _users


//     // let accum = {} as Record<keyof T & string, boolean>
//     acc[field] = true

//     return acc
// }, {} as Record<string, boolean | undefined>)

type UserSelectFields = keyof Prisma.UserSelect
export async function getAllUsers<T extends UserSelectFields>(options?: { select?: T[], log?: boolean }) {

    if (options?.select) {

        const _selected: Prisma.UserSelectScalar = selectfields(options.select)
        const _users = await prisma.user.findMany({ select: _selected })
        console.table(_users)
        return _users
    }
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            profile: true,
            role: true,
            password: true

        },
    })

    options?.log && console.table(users)
    return users
}

export async function editUser(whereArgs: { id: number }, new_user_data: Partial<Prisma.UserUpdateInput>, new_profile_data?: { name: string | null }) {
    let pwHash: string = ""
    if (new_user_data.password) pwHash = await hashPass(new_user_data.password as string)
    try {
        const { id } = whereArgs
        const _data = !!new_user_data.password ? {

            email: new_user_data.email,
            role: new_user_data.role,
            password: bcrypt.hashSync(new_user_data.password as string, 5),

        } : {
            email: new_user_data.email,
            role: new_user_data.role,
        }

        const _puser = await prisma.user.update({
            where: { id },
            data: { ..._data },
            include: {
                profile: true
            }

        })

        if (new_profile_data) {
            const { name } = new_profile_data || ""
            const _p = await prisma.profile.upsert({
                create: { userId: id, name },
                update: { name },
                where: { userId: id },
            })
            await prisma.user.update({ where: { id: _puser.id }, data: { profile: { connect: { id: _p.id } } } })
        }
        console.table(_puser)
        return _puser
    } catch (error) {
        _log(error)
        throw new Error("____update user error")
    } finally {
        // console.table(new_user_data)
        revalidatePath('/')
    }

}