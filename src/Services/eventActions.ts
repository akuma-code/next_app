'use server'

import prisma from "@/client/client"
import { DTO_NewEvent, eventCreate, updateEvent } from "./eventService";


const event = prisma.event

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


}

export async function addInfo(payload: {
    masterId: number,
    eventId: number,
    playerId: number
}) {
    const { masterId, eventId, playerId } = payload
    // const reserve =await prisma.reservedTable.create({data:{playerId, coachId:masterId}})
    const info = await prisma.eventInfo.upsert

    return event
}

export async function getMasters() {
    return await prisma.master.findMany()
}