'use server'

import prisma from "@/client/client"
import { _UserSelect } from "@/Types"

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