'use server'

import prisma from "@/client/client"
import { DTO_NewEvent, eventCreate, updateEvent } from "./eventService";


const event = prisma.event
const masterEvent = prisma.masterEvent
export async function event_ADD(payload: DTO_NewEvent) {
    const { date_formated, players, title, isDraft = false } = payload;
    const existEvent = await event.findUnique({ where: { date_formated } })

    if (existEvent) {
        return await updateEvent({ id: existEvent.id, _new_data: { players, date_formated, title, isDraft } })
    }

    return await eventCreate(payload)
}

export async function event_UpsertInfo(payload: {
    eventId: number,
    playerId: number,
    masterId: number,

}) {

    const { eventId, playerId, masterId } = payload;
    const me = await masterEvent.create({
        data: {
            masterId, eventInfoId: eventId, players: { connect: { id: playerId } }
        },

    })
    console.log(me)

    const info = await event.update({
        where: { id: eventId },
        data: {
            eventInfo: {
                create: {
                    masterEvent: { connect: { id: me.id } }
                }
            }
        },
        select: { eventInfo: true }
    })
    console.log({ info })

}

export async function addInfo(payload: {
    masterId: number,
    eventId: number,
    players: { id: number }[]
}) {
    const { masterId, eventId, players } = payload
    // const eventInfo = await prisma.eventInfo.create({
    //     data: {
    //         eventId,
    //     }
    // })
    // const masterEv = await prisma.masterEvent.create({
    //     data: {
    //         masterId,
    //         players: { connect: players },
    //         eventInfoId: 1
    //     }
    // })

    const event = await prisma.event.update(
        {
            where: { id: eventId },
            data: {
                eventInfo: {
                    connect: { eventId },
                    // create: {
                    //     masterEvent: {
                    //         create: {
                    //             masterId,
                    //             players: { connect: players }
                    //         }
                    //     }
                    // }
                },
            },
            include: { eventInfo: true }
        }
    )
    return event
}

export async function getMasters() {
    return await prisma.master.findMany()
}