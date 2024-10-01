'use server'

import prisma from "@/client/client";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function openTicket(player: Prisma.PlayerGetPayload<{ select: { id: true, name: true, ticket: true } }>, new_ticket: Prisma.TicketUncheckedCreateInput) {



    const t = await prisma.player.update({ where: { id: player.id }, data: new_ticket })

    revalidatePath("/")
    return t


}

export async function updatePlayerTicket(player: { id: number }, payload: Prisma.TicketUncheckedCreateInput) {
    const { limit } = payload
    const p = await prisma.player.update({
        where: { id: player.id },
        data: { ticket: { update: { limit: { increment: limit }, amount: { increment: limit } } } },
        omit: { createdAt: true, updatedAt: true, profileId: true }
    })
    console.log(p)
    revalidatePath("/")
    return p
}

