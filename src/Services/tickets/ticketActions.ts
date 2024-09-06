'use server'

import prisma from "@/client/client"
import { Prisma } from "@prisma/client"
import dayjs from "dayjs"
import { revalidatePath } from "next/cache"
import { createTicket, getOneTicket } from "./ticketService"

export async function createTicketForPlayer({ playerId, new_ticket = { amount: 10, eAt: 'never', limit: 10 } }: { playerId: number, new_ticket: { amount: number, eAt?: string, limit: number } }) {
    // const p = await prisma.player.findUnique({ where: { id: playerId }, select: { ticket: true, id: true } })
    try {
        const { amount, eAt, limit } = new_ticket
        const nt = await createTicket({ data: { player: { connect: { id: playerId } }, amount, eAt, limit } })
        console.table(nt)
        return nt
    } catch (e) {
        console.log(e)
        throw e
    } finally { revalidatePath("/") }
}


export async function ticketCountMinus(where: Prisma.TicketFindUniqueArgs['where'], payload: { amount: number, event_date?: string }) {
    const { amount, event_date } = payload
    const date = event_date ? event_date : dayjs().format("YYYY-MM-DD")
    try {
        const t = await prisma.ticket.update({
            where,
            data: {
                amount: { decrement: amount },
                event_dates: { push: date }
            }
        })

        console.log("🚀 ~ ticketUse: ", date, t)


        return t
    } catch (e) {
        console.log(e)
        throw e
    } finally { revalidatePath("/") }
}

export async function ticketCountPlus(where: Prisma.TicketFindUniqueArgs['where'], payload: { amount: number, event_date?: string }) {
    const { amount, event_date } = payload
    const date = event_date ? event_date : dayjs().format("YYYY-MM-DD")
    try {
        const t = await prisma.ticket.update({
            where,
            data: {
                amount: { increment: amount },
                event_dates: { set: [] }
            }
        })

        console.log("🚀 ~ ticketAddAmount: ", date, { t })


        return t
    } catch (e) {
        console.log(e)
        throw e
    } finally { revalidatePath("/") }
}


export async function connectPlayerWithTicket(where: Prisma.EventUpdateArgs['where'], data: { playerId: number, cost: number, date?: string }) {

    try {
        const tp = await prisma.player.findFirst({ where: { id: data.playerId }, select: { ticket: true, id: true, name: true, _count: { select: { events: true } } } })


        const date = data.date ? data.date : dayjs().format("YYYY-MM-DD")


        const p = await prisma.player.update({
            where: { id: data.playerId },
            data: {
                events: {
                    connect: {
                        id: where.id,
                        date_formated: where.date_formated
                    }
                },
                // ticket:
                // {
                //     upsert:
                //     {
                //         create: {
                //             event_dates: { set: [data.date || ""] },
                //         },
                //         update: {
                //             amount: {
                //                 decrement: data.cost
                //             },
                //             event_dates: { push: date },
                //         },
                //         where: {
                //             playerId: data.playerId
                //         }
                //     }
                // },

            },
            select: {
                id: true, name: true, ticket: true, _count: { select: { events: true } }
            }
        })
        if (tp?.ticket) {

            await ticketCountMinus({ playerId: tp.id }, { amount: data.cost, event_date: date })
            return tp


        }

        return p
    } catch (e) {
        console.log(e)
        throw e
    }
    finally { revalidatePath("/") }

}

export async function verifyPlayerTicketAmount(player: Prisma.PlayerGetPayload<{ select: { id: true, name: true, ticket: true } }>) {
    const t = await getOneTicket({ where: { playerId: player.id }, select: { amount: true, limit: true, uuid: true } as Prisma.TicketSelect })
    if (!t) return null
    const { amount, } = t;
    if (amount === 0) {
        console.log("Абонемент закончился!")
        return null
    }
    if (amount <= 3) {
        console.log("Осталось 3 посещения!")
        return t
    }
    return t

}