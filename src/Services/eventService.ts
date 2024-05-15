'use server'

import dayjs from "dayjs"
import prisma from "../../prisma/client/client"
import { _date, _djs } from "@/Helpers/dateFuncs"
import { _log } from "@/Helpers/helpersFns"

export async function createEvent(event_date?: string) {

    if (!dayjs(event_date).isValid()) _log(`${event_date} is wrong!`)
    try {
        const ev = await prisma.event.create({
            data: {
                date: _djs(event_date),
                players: {
                    connect: [
                        { id: 1 },
                        { id: 3 },
                    ]
                }
            },
            include: {
                players: true
            }
        })

        return ev
    } catch (error) {
        console.log("___Create event error: \n", error)
        throw new Error("Error while create event")
    }

}

