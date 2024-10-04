'use client'

import { createTicket, deleteTicket, getOneTicket } from "@/Services/tickets/ticketService";
import { Prisma } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { openTicket, updatePlayerTicket } from "./actions";
import { ticketCountMinus } from "@/Services/tickets/ticketActions";
type PrismaPlayer = Prisma.PlayerGetPayload<{
    select: {
        id: true;
        name: true;
        ticket: true;
    };
}>;

export function useTicket(playerId?: number) {


    async function openTicket(player: PrismaPlayer, payload: { limit: number }) {
        if (player.ticket) {
            return await updatePlayerTicket(player, { limit: payload.limit, playerId: player.id })
        }
        const t = await createTicket({ data: { player: { connect: { id: player.id } }, limit: payload.limit, amount: payload.limit, eAt: '2025-01-01' }, select: { player: true } })
        console.log(t)
        return t
    }

    async function applyTicket(event: Prisma.EventGetPayload<{ select: { id: true, date_formated: true, cost: true } }>, player: PrismaPlayer) {
        if (!player.ticket) return
        if (player.ticket.event_dates.includes(event.date_formated)) return
        const t = await ticketCountMinus({ playerId: player.id }, { amount: event.cost || 1, event_date: event.date_formated })
        console.log(t)
        return t

    }

    async function removeTicket(player: PrismaPlayer) {
        return await deleteTicket({ where: { playerId: player.id } })
    }

    const control = { openTicket, applyTicket, removeTicket }
    return control

}

async function getTicketData(playerId: number) {
    const t = await getOneTicket({ where: { playerId }, select: { player: true, uuid: true } })
    return t
}