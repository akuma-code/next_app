'use server'

import dayjs from "dayjs"
import prisma from "../../prisma/client/client"

import { _log } from "@/Helpers/helpersFns"

import { revalidatePath } from "next/cache"
import { _djs } from "@/Helpers/dateFuncs"

export async function createEvent(event_date?: string) {

    if (!dayjs(event_date).isValid()) _log(`${event_date} is wrong!`)
    const ev_date = dayjs(event_date).format()
    console.log('d: ', ev_date)
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
        // revalidatePath('/')
        return ev
    } catch (error) {
        console.log("___Create event error: \n", error)
        throw new Error("Error while create event")
    }

}

