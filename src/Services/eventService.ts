'use server'

import dayjs, { Dayjs } from "dayjs"
import prisma from "../../prisma/client/client"
import { _log } from "@/Helpers/helpersFns"
import { _djs, _formated_date } from "@/Helpers/dateFuncs"
import { Event } from "@prisma/client"
import { redirect } from "next/navigation"

export interface EventCreatePayload {
    event_date: string
    ids: { id: number }[]

}
export interface EventUpdatePayload {
    eventId: number
    event?: Event
    ids: { id: number }[]

}

export async function createEvent(payload: EventCreatePayload) {
    const { event_date, ids } = payload
    if (!dayjs(event_date).isValid()) _log(`${event_date} is wrong!`)

    const existEvent = await prisma.event.findFirst({ where: { date_formated: _formated_date(event_date) } })
    if (existEvent) {
        try {
            const del = prisma.event.delete({ where: { ...existEvent } })
            const remake = prisma.event.create({
                data: {
                    id: existEvent.id,
                    date_formated: _formated_date(event_date),
                    players: {
                        connect: ids
                    }
                },
                select: {
                    date_formated: true,
                    players: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },


                }
            })
            const t = await prisma.$transaction([del, remake])
            _log(`event id ${existEvent.id} removed, make new event`, t[1])
            return t

        } catch (error) {
            console.log(" \n", error)
            throw new Error("___Update event error:")
        }

    }
    try {
        const ev = await prisma.event.create({
            data: {

                date_formated: _formated_date(event_date),
                players: {
                    connect: ids
                }
            },
            select: {
                players: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                date_formated: true

            }
        })


        _log("\nCreated event: ", ev)
        return ev
    } catch (error) {
        console.log("___Create event error: \n", error)
        throw new Error("Error while create event")
    }

}

export async function updateEvent(payload: EventUpdatePayload) {
    const { ids, event } = payload

    const eventId = event ? event.id : payload.eventId

    try {
        const ev = await prisma.event.update({
            where: { id: eventId },
            data: {
                players: {
                    update: {
                        where: { id: eventId },
                        data: ids.flat()


                    }
                }
            }
        })
        return ev
    } catch (error) {
        console.log(" \n", error)
        throw new Error("___Update event error:")
    }
}

export async function getEventsUnique(date?: string) {
    if (!date) {
        _log({ date })
        return null
    }
    // if (!dayjs(date).isValid()) {
    //     _log(date, "____invalid date! \n")
    //     return null
    // }
    try {
        const playersByDate = (date: string) => prisma.event.findUnique({ where: { date_formated: date } }).players()
        return await playersByDate(date)
    } catch (error) {
        console.log(" \n", error)
        throw new Error("get event players error:")
    }

}


export async function getEventsWithPlayers() {
    const ev = await prisma.event.findMany({
        where: { players: {} },

        select: {
            date_formated: true,
            id: true,
            players: { select: { id: true, name: true } },
            _count: { select: { players: true } }
        }
    })

    return ev
}

export async function getEventsByMonth(month?: string, year = 2024) {
    const e = prisma.event
    if (!month) {
        // if month omit return all avents with players
        const events = e.findMany({
            where: { players: {} },
            orderBy: { id: 'asc' },
            select: {
                id: true,
                date_formated: true,
                players: { select: { id: true, name: true } },
                _count: { select: { players: true } }
            }
        })
        return events
    }
    const searchM = `${month}_${year}` as const
    const result = await e.findMany({
        where: {
            AND: {
                players: {},
                date_formated: { endsWith: searchM }
            }
        },
        select: {
            id: true,
            date_formated: true,
            players: { select: { id: true, name: true } },
            _count: { select: { players: true } }
        },
        orderBy: { date_formated: 'asc' }

    })

    return result
}

export async function getEventById(eventId: string) {
    const id = Number(eventId)
    if (isNaN(id)) throw new Error(`Event Id Invalid: ${eventId}`)

    const e = prisma.event
    try {
        const event = await e.findUnique({
            where: { id },
            select: {
                id: true, date_formated: true, title: true,
                players: true, _count: { select: { players: true } }
            }
        })
        return event
    } catch (error) {
        console.log(" \n", error)
        throw new Error("get eventId error:")
    }
}
export async function getOneEventByDate(date: string) {


    const e = prisma.event
    try {
        const event = await e.findUnique({
            where: { date_formated: date },
            select: {
                id: true, date_formated: true, title: true,
                players: true, _count: { select: { players: true } }
            }
        })
        return event
    } catch (error) {
        console.log(" \n", error)
        throw new Error("get event by date error:")
    }
}