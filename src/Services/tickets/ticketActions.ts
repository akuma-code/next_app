'use server'

import dayjs from "dayjs";
import { createTicket, updateTicket } from "./ticketService";
import { _date, _dbDateParser, _formated_date } from "@/Helpers/dateFuncs";
import prisma from "@/client/client";

export async function createTicketForPlayer(playerId: number, amount: number, price: number) {

    const today = _formated_date(dayjs());
    try {
        const newTicket = await createTicket({
            data: {
                playerId, amount, price,
                countFromDate: today,

            }
        })
        return newTicket
    } catch (error) {
        console.error(error)
        throw new Error("Ticket creation failed")
    }

}


export async function updateTicketData(playerId: number, data: { amount?: number, price?: number }) {
    const { amount, price } = data
    const today = _formated_date(dayjs());
    const t = await updateTicket({
        where: { playerId },
        data: { amount, price, countFromDate: today }
    })
    return t
}

export async function getPlayersWithTickets() {
    const p = await prisma.player.findMany({ where: { ticket: { isNot: null } }, select: { id: true, name: true, ticket: true, events: { select: { date_formated: true } } } })
    return p
}

// export function findEventsAfterDate(date: string, events: { date_formated: string }[]) {
//     const find_date = _dbDateParser(date)._dayjs
//     const filtered = events.filter((e) => _dbDateParser(e.date_formated)._dayjs.isAfter(find_date))
//     return filtered
// }