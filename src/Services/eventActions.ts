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

    })

    console.log('tsx_pair: ', tsx_pair)
    // console.log('tsx_eventConnect: ', tsx_eventConnect)
    revalidatePath('/')
    return tsx_pair
}

export async function removePair(payload: { mId: number, pId: number, eventId: number }) {
    const { mId, pId, eventId } = payload;

    const pair = await prisma.pair.delete({
        where: {

            eventId, game: { firstPlayerId: mId, secondPlayerId: pId }

        }
    }).finally(() => revalidatePath('/'))

    return pair
}


export async function getMasters() {
    return await prisma.master.findMany()
}