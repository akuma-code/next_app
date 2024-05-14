'use server'

import dayjs from "dayjs"
import prisma from "../../prisma/client/client"

export async function createEvent(event_date?: string) {
    const today = dayjs(Date.now()).format('DD/MM/YYYY')
    const DATE = event_date ?? today
    const d = dayjs(event_date).format()
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

