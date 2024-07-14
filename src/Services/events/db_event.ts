'use server'

import prisma from "@/client/client"
import { Event, Prisma } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"

const db = prisma.event
const db_pairs = prisma.pair
interface PrismaGetOneEvent {
    where: Prisma.EventWhereUniqueInput
    select: (keyof Prisma.EventSelect)[]
}
interface PrismaGetManyEvents {
    where: Prisma.EventWhereInput
    select: (keyof Prisma.EventSelect)[]
}

const defaultEventSelect: Prisma.EventSelect<DefaultArgs> = {
    date_formated: true,
    id: true,
    title: true,
    isDraft: false,
    players: true,
    pairs: false,
    eventInfo: false

}
function parseEventSelected(selected?: PrismaGetOneEvent['select']): Prisma.EventSelect<DefaultArgs> {
    if (!selected) return defaultEventSelect
    const res = selected.reduce((prev, current) => {
        if (!prev[current]) return prev = { ...prev, [current]: true }
        return { ...prev, [current]: true }
    }, {} as Record<keyof Prisma.EventSelect, boolean>)
    return { ...defaultEventSelect, ...res }
}
export async function getDBOneEventData(search: PrismaGetOneEvent['where'], selected?: PrismaGetOneEvent['select']) {

    try {
        const _selected = parseEventSelected(selected)
        const data = await db.findUnique({
            where: search,
            select: _selected

        })

        return { data }
    } catch (error) {
        console.error(error)
        throw error
    }


}
export async function getDBManyEventsData(search?: PrismaGetManyEvents['where'], selected?: PrismaGetManyEvents['select']) {

    try {
        const _selected = parseEventSelected(selected)
        const data = await db.findMany({
            where: search,
            select: _selected

        })

        return { data }
    } catch (error) {
        console.error(error)
        throw error
    }


}
