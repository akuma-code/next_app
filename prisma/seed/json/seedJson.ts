'use server'
import { default_event_select } from '@/Types'
import data, { DB_Type } from './index'
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function seedFromJson(db_item: Omit<DB_Type, 'players'> = data) {

    try {
        const { pairs, events } = db_item

        const events_create: Prisma.EventCreateInput[] = events.map(e => ({
            id: e.id,
            date_formated: e.date_formated,
            title: e.title,
            players: { connect: e.players.map(p => ({ id: p.id })) },

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
                select: default_event_select
            })
            return updated
        })

        await prisma.$transaction([...tsx, ...pp])


    } catch (error) {
        console.log(error)
        throw error
    }

}