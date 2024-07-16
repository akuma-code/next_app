
import data, { DB_Type } from './index'
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function seedFromJson(db_item: DB_Type = data) {

    try {
        const { pairs, events, players } = db_item

        const events_create: Prisma.EventCreateInput[] = events.map(e => ({
            id: e.id,
            date_formated: e.date_formated,
            title: e.title,
            players: { connect: e.players.map(p => ({ id: p.id })) },
            // pairs: { connect: e.pairs.map(pp => ({ eventId: pp.eventId, id: pp.id })) }
            // players: e.players.map(p => ({ ...p, eventId: e.id })) })
        }))
        const tsx = events_create.map(e => prisma.event.create({ data: e }))
        // await prisma.event.createMany({
        //     data: events_create.map(e => ({ ...e, }))
        // })


        const pp = pairs.map((pair) => {
            const { eventId, id, firstPlayerId, secondPlayerId } = pair
            const updated = prisma.event.update({ where: { id: eventId }, data: { pairs: { connectOrCreate: { create: { id, firstPlayerId, secondPlayerId }, where: { id } } } } })
            return updated
        })
        // const ppp = events.map((e) => {
        //     const { id, players } = e
        //     return { eventId: id, players }
        // })
        // const added = ppp.map(pe => prisma.event.update({
        //     where: { id: pe.eventId },
        //     data: {
        //         players: { connect: { ...pe.players } }
        //     }
        // }))


        // console.log("🚀 ~ seedFromJson ~ tsx_events2:", tsx_events2)






        // await prisma.$transaction(tsx_events2)
        // await prisma.$transaction([...pp, ...added])
        await prisma.$transaction([...tsx, ...pp])


    } catch (error) {
        console.log(error)
        throw error
    }

}