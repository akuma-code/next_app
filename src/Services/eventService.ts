'use server'

import dayjs from "dayjs"
import prisma from "../../prisma/client/client"
import { _date } from "@/Helpers/dateFuncs"
import { revalidatePath } from "next/cache"

export async function createEvent(event_date?: string) {

    const ev_date = dayjs(event_date).format()
    console.log('d: ', ev_date)
    try {
        const ev = await prisma.event.create({
            data: {
                date: ev_date,
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

