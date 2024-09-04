'use server'

import prisma from "@/client/client"
import { createTicket } from "./ticketService"
import { Prisma } from "@prisma/client"
import { _dbDateParser } from "@/Helpers/dateFuncs"
import dayjs from "dayjs"
import { revalidatePath } from "next/cache"

export async function createTicketForPlayer({ playerId, new_ticket = { amount: 0, eAt: 'never' } }: { playerId: number, new_ticket: { amount: number, eAt?: string } }) {
    // const p = await prisma.player.findUnique({ where: { id: playerId }, select: { ticket: true, id: true } })
    try {
        const { amount, eAt } = new_ticket
        const nt = await createTicket({ data: { player: { connect: { id: playerId } }, amount, eAt } })
        return nt
    } catch (error) {
        throw error
    } finally { revalidatePath("/") }
}


export async function ticketCountMinus(where: Prisma.TicketFindUniqueArgs['where'], payload: { amount: number, event_date?: string }) {
    const { amount, event_date } = payload
    const date = event_date ? event_date : dayjs().format("YYYY-MM-DD")
    try {
        const t = prisma.ticket.update({
            where,
            data: {
                amount: { decrement: amount },
                event_dates: { push: date }
            }
        })

        console.log("🚀 ~ ticketUse: ", date, { t })


        return t
    } catch (error) {
        throw error
    } finally { revalidatePath("/") }
}

export async function ticketCountPlus(where: Prisma.TicketFindUniqueArgs['where'], payload: { amount: number, event_date?: string }) {
    const { amount, event_date } = payload
    const date = event_date ? event_date : dayjs().format("YYYY-MM-DD")
    try {
        const t = prisma.ticket.update({
            where,
            data: {
                amount: { increment: amount },
                event_dates: { push: date }
            }
        })

        console.log("🚀 ~ ticketAddAmount: ", date, { t })


        return t
    } catch (error) {
        throw error
    } finally { revalidatePath("/") }
}


export async function connectPlayerWithTicket(where: Prisma.EventUpdateArgs['where'], data: { id: number, cost: number, date?: string }) {

    try {
        const date = data.date ? data.date : dayjs().format("YYYY-MM-DD")
        const p = await prisma.player.update({
            where: { id: data.id }, data: {
                events: {
                    connect: {
                        id: where.id,
                        date_formated: where.date_formated
                    }
                },
                ticket:
                {
                    upsert:
                    {
                        create: {
                            amount: data.cost
                        },
                        update: {
                            amount: {
                                decrement: data.cost
                            },
                            event_dates: { push: date },
                        },
                        where: {
                            playerId: data.id
                        }
                    }
                },

            },
            select: {
                id: true, name: true, ticket: true
            }
        })
        return p
    } catch (error) {
        throw error

    } finally { revalidatePath("/") }

}