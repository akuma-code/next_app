'use server'
import prisma from "@/client/client";
import { getDBManyEventsData, getDbManyPairsData } from "./events/db_event";


type PromiseType<T> = T extends Promise<infer U> ? U : never

export type EVResponse = PromiseType<ReturnType<typeof getEventsData>>[0]
export type PLResponse = PromiseType<ReturnType<typeof getPlayersData>>[0]

export async function getEventsData(options?: { log?: boolean }) {
    const e = await prisma.event.findMany({

        select: {
            id: true,
            date_formated: true,
            eventInfo: true,
            pairs: true,
            title: true,
            isDraft: true,
            players: {
                select: {
                    id: true,
                    name: true,

                },

            },
        }
    })
    if (options?.log === true) {
        console.clear()
        console.table(e)
    }
    return e
}

export async function getPlayersData(options?: { log?: boolean }) {
    const p = await prisma.player.findMany({
        select: {
            id: true,
            name: true,
            // info: true,
            // profile: true,

        },
        where: { name: { not: undefined } },
        distinct: ["name"]


    })
    const pwe = await prisma.player.findMany({
        where: {
            NOT: [
                { events: { none: {} } }
            ]
        },
        include: {
            events: true,
            // info: true,
            // profile: true,
        }
    })
    if (options?.log === true) {
        console.clear()
        console.log("___players")
        console.table(p)
        console.log("___players with events")
        console.table(pwe)

    }
    return p
}

export async function getAllData() {
    try {
        const { data: events } = await getDBManyEventsData({}, ["date_formated", "id", "pairs", "players", "title"])
        const { data: pairs } = await getDbManyPairsData({}, ["eventId", "id", "firstPlayerId", "secondPlayerId"])

        const players = await prisma.player.findMany({ select: { id: true, name: true } })
        // const pairs = prisma.pair.findMany()
        const users = await prisma.user.findMany()

        const response = { events, pairs, players, users }
        // .then(() => pls)
        // .then(() => pairs)
        // .then(() => users)

        console.log("all data: \n", response)
        return response
    } catch (error) {
        throw error
    }
}