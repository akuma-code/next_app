'use server'

import { default_event_select, DB_JSON_DATA } from '@/Types'
// import data, { DB_Type } from '@/seed/json/seedJson'
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function loadAndSeedEvents(db_item: DB_JSON_DATA, options = { select: default_event_select }) {
    const { select } = options
    try {
        const { pairs, events } = db_item

        const events_create: Prisma.EventCreateInput[] = events.map(e => ({
            id: e.id,
            date_formated: e.date_formated,
            title: e.title,
            players: { connect: e.players.map(p => ({ id: p.id })) },
            select
        }))



        const tsx = events_create.map(e => prisma.event.create({ data: e }))
        const pp = pairs.map((pair) => {
            const { eventId, id, firstPlayerId, secondPlayerId } = pair
            const [masterId, playerId] = [firstPlayerId, secondPlayerId]
            const updated = prisma.event.update({
                where: { id: eventId },
                data: {
                    pairs: {
                        connectOrCreate: {
                            create: { id, firstPlayerId, secondPlayerId, masterId, playerId },
                            where: { id }
                        }
                    }
                },
                select
            })
            return updated
        })

        await prisma.$transaction([...tsx, ...pp])


    } catch (error) {
        console.log(error)
        throw error
    }

}

export default loadAndSeedEvents