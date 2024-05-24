'use server'

import { _formated_date } from "@/Helpers/dateFuncs"
import { _log } from "@/Helpers/helpersFns"
import { Event } from "@prisma/client"
import { revalidatePath } from "next/cache"
import prisma from "@/client/client"

export interface EventCreatePayload {
    event_date: string
    ids: { id: number }[]

}
export interface EventUpdatePayload {
    eventId: number
    event?: Event
    ids: { id: number }[]

}
function validateDate(date_to_valid: string) {
    const regex = /\d{2}_\d{2}_\d{4}/gi
    const isValid = regex.test(date_to_valid)
    _log("__date: ", { isValid })
    return isValid
}
export async function createEvent(payload: EventCreatePayload) {
    const { event_date, ids } = payload
    const date = validateDate(event_date) ? event_date : _formated_date(event_date)
    // if (!dayjs(event_date).isValid()) {
    //     _log(`${event_date} is wrong!`)
    //     throw new Error(`\n\nEvent date is invalid: ${event_date}`)
    // }

    const existEvent = await prisma.event.findUnique({ where: { date_formated: date } })
    if (existEvent) {
        try {
            const ee = await connectPlayersToEvent(existEvent.id, ids)


            return ee
        } catch (error) {
            console.log(" \n", error)
            throw new Error("___Update event error:")
        }

    }
    try {
        const ev = await prisma.event.create({
            data: {

                date_formated: date,
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

        revalidatePath('/')
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
                players: true,
                //  _count: { select: { players: true }                  }
            }
        })
        return event
    } catch (error) {
        console.log(" \n", error)
        throw new Error("get event by date error:")
    }
}


export async function createBlankEvent(date: string, title?: string) {
    const _date = date
    const pev = await prisma.event.create({ data: { date_formated: _date, title: title }, select: { id: true, date_formated: true } })
    return pev
}

export async function connectPlayersToEvent(id: number, players: { id: number }[]) {
    _log(players)
    try {
        const connected = await prisma.event.findUnique({ where: { id }, select: { players: { select: { id: true } } } })!
        const disconnect = connected?.players.filter(p => !players.includes({ id: p.id }))
        const disconnect_event = prisma.event.update({
            where: { id },
            data: {
                players: {
                    disconnect: disconnect
                }
            }

        })
        const connect_event = prisma.event.update({
            where: { id },
            data: {
                players: {
                    connect: players
                }
            },
            include: {
                players: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        return await prisma.$transaction([disconnect_event, connect_event])
    } catch (error) {
        console.log(" \n", error)
        throw new Error("CONNECT PLAYERS ERROR")
    } finally {
        revalidatePath('/')
    }

}