'use server'

import prisma from "@/client/client"
import { Prisma } from "@prisma/client"
const default_select = {
    uuid: true,
    player: { select: { id: true, name: true } },
    size: true,
    uAt: false,
    cAt: false,
    eAt: false,
} satisfies Prisma.TicketSelect
export async function createTicket(payload: { size: number, player: { name: string, id?: number } }) {
    const { size, player } = payload

    try {
        const p = await prisma.ticket.create({
            data: {
                size,
                player: {
                    connectOrCreate: {
                        create: { name: player.name },
                        where: { id: player.id, name: player.name }
                    }
                }
            }, select: default_select
        })

        console.log("new ticket: \n", p)
        return p
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function findTicket(payload: Prisma.TicketFindFirstArgs, options?: { select?: Prisma.TicketSelect }) {

    const _select = options?.select ? { ...default_select, ...options.select } satisfies Prisma.TicketSelect : default_select
    const t = await prisma.ticket.findFirst({
        where: payload.where,
        select: _select
    })
    console.log("found: ", t)
    return t
}
export async function findManyTickets(payload: Prisma.TicketFindManyArgs, options?: { select?: Prisma.TicketSelect }) {

    const _select = options?.select ? { ...default_select, ...options.select } satisfies Prisma.TicketSelect : default_select
    const t = await prisma.ticket.findMany({
        where: payload.where,
        select: _select
    })
    console.log("found: ", t)
    return t
}

export async function updateTicket(where: Prisma.TicketUpdateArgs['where'], data: Prisma.TicketUpdateArgs['data']) {
    try {
        const t = await prisma.ticket.update({
            where,
            data,
            select: default_select
        })

        console.log("updated ticket: ", t)
        return t
    } catch (error) {
        console.error("update error\n", error)
        throw error
    }
}