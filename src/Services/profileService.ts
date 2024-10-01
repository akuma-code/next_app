'use server'

import prisma from "@/client/client"
import { _UserSelect } from "@/Types"
import { getUser } from "./userService"
import { revalidatePath } from "next/cache"

export async function changeUserPassword({ id, new_password }: { id: number, new_password: string }) {
    const user = await prisma.user.findFirst({
        where: { id },
        select: _UserSelect.all
    })
    const old = user?.password
    if (!user) {
        console.error("User not found!")
        return null
    }

    const edited = await prisma.user.update({
        where: { id },
        data: { password: new_password },
        select: _UserSelect.all
    })
    return edited
    console.log(`Password changed from ${old} to ${new_password}`)
    console.table(user)
    return user
}

export async function changeUserImage({ id, image }: { id: number, image: string }) {
    const user = await prisma.user.findFirst({
        where: { id },
        select: _UserSelect.no_pass
    })
    if (!user) {
        console.error("User not found!")
        return null
    }
    const updated = await prisma.user.update({
        where: { id: user.id },
        data: { image },
        select: _UserSelect.no_pass
    })
    return updated
    console.table(user)
}

export async function linkUserToPlayer({ user_id, player_id }: { user_id: number, player_id: number }) {
    try {
        const user = await getUser({ id: user_id })
        if (!user?.profile) {
            await prisma.user.update({
                where: { id: user_id },
                data: { profile: { create: { name: user?.name } } }
            })
        }

        // const updated = await prisma.user.update({
        //     where: { id: user_id },
        //     data: {
        //         profile: {
        //             connectOrCreate: {
        //                 where: { userId: user_id },
        //                 create: {
        //                     name: user?.name,
        //                 }
        //             },

        //         }
        //     },
        //     include: { profile: true }
        // })

        const profile = await prisma.profile.update({
            where: { userId: user_id },
            data: { player: { connect: { id: player_id }, }, name: user?.name },
            include: { player: true, user: true }
        })
        console.table(profile)
        return profile

    } catch (error) {
        console.error("Profile link failed")
        throw error
    } finally {
        revalidatePath("/")
    }
}

