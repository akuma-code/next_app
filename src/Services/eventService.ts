'use server'

import dayjs from "dayjs"
import prisma from "../../prisma/client/client"
import { _date } from "@/Helpers/dateFuncs"

export async function createEvent(event_date?: string) {

    const d = _date(event_date).format
    try {
        const ev = await prisma.event.create({
            data: {
                date: d,
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

