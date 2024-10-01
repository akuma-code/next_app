'use server'

import { Categorie } from "@/app/api/db/[category]/route";
import prisma from "@/client/client";
import { Prisma } from "@prisma/client";
export type PrismaEventResponse = Prisma.EventGetPayload<{
    select: {
        id: true,
        cost: true,
        date_formated: true,
        pairs: {
            select: { eventId: true, playerId: true, masterId: true },
        },
        players: {
            select: {
                id: true,
                events: { select: { date_formated: true, id: true } },
                pair: true,
                ticket: true,
                name: true,
            },
        },
        title: true,
        // _count: { select: { players: true } },
    },
}>

export type PrismaPlayerResponse = Prisma.PlayerGetPayload<{
    select: {
        id: true,
        name: true,
        events: { select: { id: true, date_formated: true } },
        ticket: true,
    }
}>
export type PrismaTicketResponse = Prisma.TicketGetPayload<true>
export type PrismaPairResponse = Prisma.PairGetPayload<{ select: { eventId: true, playerId: true, masterId: true } }>
export type PrismaDataResponse = {
    event: PrismaEventResponse[]
    pair: PrismaPairResponse[]
    player: PrismaPlayerResponse[]
    ticket: PrismaTicketResponse[]
}
export async function getLocal_db() {
    const db_tsx = [
        prisma.player.findMany({
            select: {
                id: true,
                name: true,
                events: { select: { id: true, date_formated: true } },
                ticket: true,
            },
            orderBy: { id: "desc" },
        }),
        prisma.ticket.findMany(),
        prisma.event.findMany({
            select: {
                id: true,
                cost: true,
                date_formated: true,
                pairs: {
                    select: { eventId: true, playerId: true, masterId: true },
                },
                players: {
                    select: {
                        id: true,
                        events: { select: { date_formated: true, id: true } },
                        pair: true,
                        ticket: true,
                        name: true,
                    },
                },
                title: true,
                // _count: { select: { players: true } },
            },
            // orderBy: { id: "desc" },
        }),
        prisma.pair.findMany({
            select: { eventId: true, playerId: true, masterId: true },
        }),
    ];

    const db_data = await prisma.$transaction(db_tsx) as [PrismaPlayerResponse[], PrismaTicketResponse[], PrismaEventResponse[], PrismaPairResponse[]]
    const data: PrismaDataResponse = {
        player: db_data[0],
        ticket: db_data[1],
        event: db_data[2],
        pair: db_data[3],
    }




    return data

}