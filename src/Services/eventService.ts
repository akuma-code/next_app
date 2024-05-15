'use server'

import dayjs from "dayjs"
import prisma from "../../prisma/client/client"
import { _log } from "@/Helpers/helpersFns"
import { _djs } from "@/Helpers/dateFuncs"

interface EventCreatePayload {
    event_date: string
    ids: { id: number }[]

}

export async function createEvent(payload: EventCreatePayload) {
    const { event_date, ids } = payload
    if (!dayjs(event_date).isValid()) _log(`${event_date} is wrong!`)


    try {
        const ev = await prisma.event.create({
            data: {
                date: _djs(event_date),

                players: {
                    connect: ids
                }
            },
            select: {
                players: true,

            }
        })


        _log("\nCreated event: ", ev)
        return ev
    } catch (error) {
        console.log("___Create event error: \n", error)
        throw new Error("Error while create event")
    }

}

