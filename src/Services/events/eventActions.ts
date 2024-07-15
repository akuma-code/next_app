'use server'

import prisma from "@/client/client"
import { DTO_NewEvent, eventCreate, updateEventPlayers } from "../eventService";
import { revalidatePath } from "next/cache";
import { _log } from "@/Helpers/helpersFns";


const event = prisma.event

export async function event_ADD(payload: DTO_NewEvent) {
    const { date_formated, players, title, isDraft = false } = payload;
    const existEvent = await event.findUnique({ where: { date_formated } })

    if (existEvent) {
        return await updateEventPlayers({ id: existEvent.id, _new_data: { players, date_formated, title, isDraft } })
    }

    return await eventCreate(payload)
}

export async function addPair(payload: {
    masterId: number,
    eventId: number,
    playerId: number
}) {
    const { masterId: firstPlayerId, eventId, playerId: secondPlayerId } = payload
    try {
        const tsx_pair = await prisma.pair.create({
            data: {
                firstPlayerId,
                secondPlayerId,
                eventId
                // event: { connect: { id: eventId } }

            },
            select: { id: true }

        })

        console.log('\ntsx_pair: ', tsx_pair)
        // console.log('tsx_eventConnect: ', tsx_eventConnect)

        return tsx_pair
    } catch (error) {
        _log(error)
        throw new Error("_Create pair error")
    } finally { revalidatePath('/') }

}

export async function removePair(pairId: number) {
    try {
        const pair = await prisma.pair.delete({
            where: {
                id: pairId
            }
        })

        return pair
    } catch (error) {
        _log(error)
        throw new Error("_Delete pair error")
    } finally {
        revalidatePath('/')
    }

}
export async function updatePair(pairId: number, payload: { masterId: number, playerId: number }) {
    const { masterId: firstPlayerId, playerId: secondPlayerId } = payload
    try {
        const pair = await prisma.pair.update({
            where: {
                id: pairId
            },
            data: {

                firstPlayerId: payload.masterId,
                //  secondPlayerId:payload.playerId
            },
            select: { id: true }
        })

        return pair
    } catch (error) {
        _log(error)
        throw new Error("_Update pair error")
    } finally {
        revalidatePath('/')
    }

}

export async function syncPairs() {
    try {
        const pairs = await prisma.pair.findMany()
        if (!pairs.every(p => !!p.masterId)) return console.log("\nskipped!\n")
        console.log("\nSYNCING!\n")
        const tsx_pairs = pairs.map(p => prisma.pair.update({
            where: { id: p.id },
            data: {
                player: { connect: { id: p.secondPlayerId } },
                master: { connect: { id: p.firstPlayerId } }
            }
        }))
        const tsx = await prisma.$transaction(tsx_pairs)
        console.log({ tsx })
        // return tsx
    } catch (error) {
        console.log(error)
    }
}
export async function getEventPairs(eventId: number | undefined) {
    await syncPairs()
    try {

        if (!eventId) {

            const pair = await prisma.pair.findMany({

                // include: { event: { select: { date_formated: true, id: true, players: true } } }
            })
            return pair
        }
        const pair = await prisma.pair.findMany({
            where: { eventId: eventId },
            // select: { masterId: false, playerId: false, firstPlayerId: true, secondPlayerId: true }
            // include: { event: { select: { date_formated: true, id: true, players: true } } },

        })

        return pair
    } catch (error) {
        console.log(error)
        throw error
    }

}