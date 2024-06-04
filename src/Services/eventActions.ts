'use server'

import prisma from "@/client/client"
import { DTO_NewEvent, eventCreate, updateEventPlayers } from "./eventService";
import { revalidatePath } from "next/cache";


const event = prisma.event

export async function event_ADD(payload: DTO_NewEvent) {
    const { date_formated, players, title, isDraft = false } = payload;
    const existEvent = await event.findUnique({ where: { date_formated } })

    if (existEvent) {
        return await updateEventPlayers({ id: existEvent.id, _new_data: { players, date_formated, title, isDraft } })
    }

    return await eventCreate(payload)
}

export async function event_UpsertInfo(payload: {
    eventId: number,
    playerId: number,
    masterId: number,

}) {

    const { eventId, playerId, masterId } = payload;


}

export async function addPair(payload: {
    masterId: number,
    eventId: number,
    playerId: number
}) {
    const { masterId: firstPlayerId, eventId, playerId: secondPlayerId } = payload

    const tsx_pair = await prisma.pair.create({
        data: {
            firstPlayerId,
            secondPlayerId,
            eventId
            // event: { connect: { id: eventId } }

        },
        select: { id: true }

    }).finally((() => revalidatePath('/')))

    console.log('tsx_pair: ', tsx_pair)
    // console.log('tsx_eventConnect: ', tsx_eventConnect)

    return tsx_pair
}

export async function removePair(pairId: number) {

    const pair = await prisma.pair.delete({
        where: {
            id: pairId
        }
    }).finally(() => revalidatePath('/'))

    return pair
}
export async function updatePair(pairId: number, payload: { masterId: number, }) {
    const { masterId: firstPlayerId, } = payload
    const pair = await prisma.pair.update({
        where: {
            id: pairId

        },
        data: {
            firstPlayerId
        }
    }).finally(() => revalidatePath('/'))

    return pair
}

export async function getMasters() {
    return await prisma.master.findMany()
}