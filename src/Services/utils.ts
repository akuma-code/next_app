'use server'
import prisma from "@/client/client";
import { getDBManyEventsData, getDbManyPairsData } from "./events/db_event";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";


type PromiseType<T> = T extends Promise<infer U> ? U : never

export type EVResponse = PromiseType<ReturnType<typeof getEventsData>>[0]
export type PLResponse = PromiseType<ReturnType<typeof getPlayersData>>[0]

export async function getEventsData(options?: { log?: boolean }) {
    const e = await prisma.event.findMany({

        select: {
            id: true,
            date_formated: true,

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
            ticket: true
            // info: true,
            // profile: true,

        },



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
        const { data: events } = await getDBManyEventsData({}, { pairs: true, players: true, date_formated: true } satisfies Prisma.EventSelect)
        const { data: pairs } = await getDbManyPairsData({}, { master: true, player: true, event: true, id: true })

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


export async function updateEventDates() {
    const dates = await prisma.event.findMany({ where: { date_formated: { endsWith: '2024' } }, select: { id: true, date_formated: true } })
    try {

        const new_date = (old_date: string, idx?: number) => old_date.split("_").reverse().join("-")
        const reversed = dates.map(e => ({ ...e, date_formated: new_date(e.date_formated) }))
        const tsx = reversed.map(r => prisma.event.update({ where: { id: r.id }, data: { date_formated: r.date_formated } }))
        return await prisma.$transaction(tsx)
    } catch (error) {
        throw error
    } finally {
        console.log({ dates })
        revalidatePath("/")
    }

}

