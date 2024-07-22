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
interface PrismaGetManyPairs {
    where: Prisma.PairWhereInput
    select: (keyof Prisma.PairSelect)[]
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
function parseEventSelected<T extends PrismaGetOneEvent['select']>(selected?: T): Prisma.EventSelect<DefaultArgs> {
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
            select: { ..._selected, eventInfo: false, _count: false }

        })

        return data
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

function parsePairSelected<T>(selected?: (keyof T)[]) {
    const defaultSelect: Prisma.PairSelect<DefaultArgs> = {
        id: true, eventId: true, firstPlayerId: true, secondPlayerId: true, masterId: true, playerId: true
    }
    if (!selected) return defaultSelect
    const res = selected.reduce((prev, current) => {
        if (!prev[current]) return prev = { ...prev, [current]: true }
        return { ...prev, [current]: true }
    }, {} as Record<keyof T, boolean>)
    return { ...defaultSelect, ...res }
}
export async function getDbManyPairsData(search?: PrismaGetManyPairs['where'], selected?: PrismaGetManyPairs['select']) {


    const _select = { ...parsePairSelected(selected) }
    try {
        if (!search) {
            const data = await prisma.pair.findMany({
                select: _select
            })
            return { data }
        }
        const data = await prisma.pair.findMany({
            where: search,
            select: _select
        })
        return { data }
    } catch (error) {
        console.log(error)
        throw error
    }
}