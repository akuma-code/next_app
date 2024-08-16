'use server'

import data, { DB_Type } from './index'
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const default_event_select = {
    date_formated: true,
    id: true,
    pairs: true,
    players: true,
    title: true,

} satisfies Prisma.EventSelect
export async function seedFromJson(db_item = data) {
    function reversed(date: string) {
        return date.endsWith("2024") ? date.split("_").reverse().join("-") : date
    }
    try {
        const { pairs, events, players } = db_item

        const events_create = events.map(e => ({
            id: e.id,
            date_formated: reversed(e.date_formated),
            title: e.title,
            players: e.players?.map(p => ({ id: p.id })),

        }))
        // const events_create: Prisma.EventCreateInput[] = events.map(e => ({
        //     id: e.id,
        //     date_formated: reversed(e.date_formated),
        //     title: e.title,
        //     players: { connect: e.players?.map(p => ({ id: p.id })) },

        // }))

        const players_create = players.map(p => prisma.player.create({ data: { name: p.name } }))

        const tsx = events_create.map(e => prisma.event.create({
            data: {
                date_formated: e.date_formated

            }
        }))
        const pp = pairs.map((pair) => {
            const { eventId } = pair
            const pp = { ...pair } as any
            // const [masterId, playerId] = [firstPlayerId!, secondPlayerId!]
            const updated = prisma.event.update({
                where: { id: eventId },
                data: {

                },
                select: default_event_select
            })
            return updated
        })

        // await prisma.$transaction(players_create)
        await prisma.$transaction([...tsx,])


    } catch (error) {
        console.log(error)
        throw error
    }

}