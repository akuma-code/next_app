'use server'

import { hashPass } from "@/auth/utils";
import { validateEmail } from "@/auth/validator";
import prisma from "@/client/client";
import { _log } from "@/Helpers/helpersFns";
import { _UserSelect, P_ProfileCreateArgs, P_UserCreateArgs } from "@/Types";
import { Prisma } from "@prisma/client";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { createPlayer } from "./playerService";
import { linkUserToPlayer } from "./profileService";
type GetOnePayload = { id: string, } | { email: string }

export type RSelectFields<T, P> = T extends keyof P & string ? T[] : never
export async function getUser(payload: Prisma.UserWhereUniqueInput, options?: { withPass?: boolean }) {
    const u = prisma.user
    try {

        if ('id' in payload) {
            const { id } = payload;
            const user = await u.findFirst({
                where: { id: Number(id) },
                select: { profile: true, ..._UserSelect.all, },

            })

            return user
        } else {
            const { email } = payload;
            const user = await u.findUnique({
                where: { email },
                select: { profile: true, ..._UserSelect.all, }
            })
            return user
        }


    } catch (e) {
        _log(e)
        throw new Error("Find user error")
    }
}
export async function getUserByEmail({ email }: { email: string }) {

    let user = await prisma.user.findFirst({
        where: { email }, select: {
            email: true,
            // id: true,
            name: true,
            password: true,
            image: true,
            role: true,
            // profile: true
        }
    })
    if (!user) return null
    // const result = { ...user, db_id: user.id, id: user.id.toString() }

    return user
}
export async function getOneUserByEmail(payload: { email: string }, options?: { withPass?: boolean }) {
    try {
        const u = prisma.user


        const { email } = payload;




        const user = await u.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
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

export async function testGetUser(email?: string | null) {
    if (!email) return null
    const u = prisma.user.findUnique({ where: { email }, include: { profile: true } })
    revalidatePath("/")
    return u

}



export async function createUser({ email, password, name }: P_UserCreateArgs, new_profile?: P_ProfileCreateArgs) {
    const verifiedEmail = validateEmail(email)

    if (!verifiedEmail) {

        console.error("Email is not valid")
        return null
    }


    try {
        const existUser = await prisma.user.findUnique({ where: { email: verifiedEmail } })
        if (existUser) {
            console.error("Email already in use, try another")
            return null
        }
        let _profile: object | Prisma.ProfileCreateInput = new_profile ? new_profile : {}



        const pwHash = await bcrypt.hash(password, 5)
        const user = await prisma.user.create({
            data: {
                email: verifiedEmail,
                password: password,
                name,
                profile: { create: new_profile }

            },
            select: _UserSelect.no_pass
        })
        console.log("User created")
        console.table(user)
        return user
    } catch (e) {
        _log(e)
        throw new Error("create user error")
    } finally {
        revalidatePath('/')
    }
}

export async function createUserWithProfile(user_data: Prisma.UserCreateInput, profile_data?: Prisma.ProfileCreateInput) {
    const { email, password, role, name } = user_data

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
                password: password,
                role: role,
                name,
                profile: {
                    create: {
                        name,

                        ...profile_data
                    }
                }
            },
            include: {
                profile: true,


            }
        })
        if (name) {
            const player = await getUserByName(name)
            if (!player) {
                const new_player = await createPlayer(name)
                const player_id = new_player.id
                const p = await linkUserToPlayer({ user_id: user.id, player_id })
                console.log("new player created, ", p.player)
            }
            else {
                const p = await linkUserToPlayer({ user_id: user.id, player_id: player.id })
                console.log("player connected: ", p.player)
            }
        }
        console.table(user)
        return user
    } catch (e) {
        _log(e)
        throw new Error("create user error")
    } finally {
        revalidatePath('/')
    }

}

// type UserSearchId = {
//     type: 'id'
//     search: number
// }
// type UserSearchEmail = {
//     type: 'email'
//     search: string
// }

// type UserSearchParam = UserSearchEmail | UserSearchId
// export async function updateUser(q: UserSearchParam, _data: Prisma.UserUpdateInput) {


//     try {
//         switch (q.type) {
//             case "email": {
//                 const { search } = q;

//                 const user = await prisma.user.update({
//                     where: { email: search }, data: {
//                         ..._data,

//                     }, select: {
//                         email: true,
//                         id: true,
//                         role: true,
//                         password: !!_data.password,
//                     }
//                 })
//                 return user
//             }
//             case "id": {
//                 const { search } = q;

//                 const user = await prisma.user.update({
//                     where: { id: search }, data: {
//                         ..._data
//                     }, select: {
//                         email: true,

//                         id: true,
//                         role: true,
//                         password: !!_data.password,
//                     }
//                 })
//                 return user
//             }
//             default: throw new Error("Query invalid")
//         }




//     } catch (error) {
//         _log(error)
//         throw new Error("____update user error")
//     } finally {
//         _log("data changed: ", _data)
//         revalidatePath('/')
//     }
// }


// export async function setAdmin(email: string) {
//     return await updateUser({ type: 'email', search: email }, { role: 'ADMIN' })
// }


const selectfields = <T extends { [x: string]: any }>(fields: (keyof T & string)[]) => fields.reduce((acc, field) => {
    acc[field] = true
    return acc
}, {} as Record<string, boolean | undefined>)

type UserSelectFields = keyof Prisma.UserSelect
export async function getAllUsers<T extends UserSelectFields>(options?: { select?: T[], log?: boolean }) {

    if (options && options.select) {

        const _selected: Prisma.UserSelectScalar = selectfields(options.select)
        const _users = await prisma.user.findMany({ select: _selected })
        _log("___users")
        console.table(_users)
        return _users
    } else {
        const users = await prisma.user.findMany({
            select: {
                email: true,
                id: true,
                name: true,
                image: true,
                role: true
            },

        })
        _log("___users")
        console.table(users)
        return users
    }


}


export async function editUser(whereArgs: { id: number }, new_user_data: Prisma.UserUpdateInput, new_profile_data?: Prisma.ProfileUpdateInput) {
    let pwHash: string = ""
    if (new_user_data.password) pwHash = await hashPass(new_user_data.password as string)
    try {
        const { id } = whereArgs


        const _puser = await prisma.user.update({
            where: { id },
            data: { ...new_user_data },
            include: {
                profile: true
            }

        })

        if (new_profile_data) {
            const { name } = new_profile_data || ""
            const _p = await prisma.profile.upsert({
                create: { userId: id },
                update: { ...new_profile_data },
                where: { userId: id },
            })
            await prisma.user.update({ where: { id: _puser.id }, data: { profile: { connect: { id: _p.id } } } })
        }
        console.info(_puser)

        return _puser
    } catch (error) {
        _log(error)
        throw new Error("____update user error")
    } finally {
        // console.table(new_user_data)
        revalidatePath('/')
    }

}

export async function getUserByName(name: string) {
    const p = await prisma.player.findFirst({
        where: { name },
        include: {
            profile: true,
            info: true
        }
    })

    return p
}