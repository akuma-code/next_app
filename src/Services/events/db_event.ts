'use server'

import prisma from "@/client/client"
import { Event, Prisma } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"

const db = prisma.event
const db_pairs = prisma.pair
interface PrismaGetOneEvent {
    where: Prisma.EventWhereUniqueInput
    select: Prisma.EventSelect

    config?: {
        row_data?: boolean
    }
}

export type EventIncludesReturn = {
    pairs: Prisma.PairGetPayload<{ include: { master: true, player: true } }>[]
    players: Prisma.PlayerGetPayload<true>[]
    id: number
    date_formated: string
    title?: string | null
}
interface PrismaGetManyEvents {
    where: Prisma.EventWhereInput
    select: Prisma.EventSelect
}
interface PrismaGetManyPairs {
    where: Prisma.PairWhereInput
    select: Prisma.PairSelect
}

const defaultEventSelect: Prisma.EventSelect = {
    id: true,
    date_formated: true,
    title: true,
    players: true,
    pairs: { include: { master: true, player: true } },
    isDraft: false,
    eventInfo: false

}

export interface GetEventResponse {

    id: number;
    date_formated: string;
    title: string | null;
    isDraft: boolean | null;
    pairs: Prisma.PairGetPayload<true>[]
    players: Prisma.PlayerGetPayload<true>[]
}

function parseEventSelected<T extends PrismaGetOneEvent['select']>(selected?: T): Prisma.EventSelect<DefaultArgs> {
    // if (!selected) return defaultEventSelect
    // const res = selected.reduce((prev, current) => {
    //     if (!prev[current]) return prev = { ...prev, [current]: true }
    //     return { ...prev, [current]: true }
    // }, {} as Record<keyof Prisma.EventSelect, boolean>)
    return { ...defaultEventSelect, }
}
export async function getDBOneEventData(search: PrismaGetOneEvent['where'], selected?: PrismaGetOneEvent['select']) {

    try {
        // const _selected = parseEventSelected(selected)
        const data = await db.findUniqueOrThrow({
            where: search,
            select: { _count: false, ...selected, eventInfo: false, }

        })

        return data
    } catch (error) {
        console.error(error)
        throw error
    }


}

export async function getEventWithConfig({ where, select, config }: PrismaGetOneEvent) {
    // if (!where.id) return null
    if (config) {
        const { row_data = false } = config
        if (row_data === true) {

        }
    }
    try {
        // const _selected = parseEventSelected(selected)
        const data = await db.findUniqueOrThrow({
            where,
            select: {
                id: true,

                ...select
            }
        })
        // const tolog = await db.groupBy({
        //     by: ['date_formated'],
        //     where: { pairs: {} },
        //     having: {
        //         date_formated: { endsWith: '06_2024' }
        //     },
        //     orderBy: { date_formated: 'asc' }
        // })
        // console.log(tolog.map(t => ({ ...t, date: t.date_formated.split("_").reverse().join("-") })))
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

interface GetEventWithIncludesProps {
    where: Prisma.EventWhereUniqueInput
    includes?: Prisma.EventInclude<DefaultArgs>
}
interface GetEventWithSelectProps {
    where: Prisma.EventWhereUniqueInput
    select?: Prisma.EventSelect<DefaultArgs>
}

type GetEventProps =
    | GetEventWithIncludesProps
    | GetEventWithSelectProps
export async function getEventWithIncludes(payload: GetEventWithIncludesProps) {
    // if (!where.id) return null
    const { where, includes } = payload

    try {

        const data = await db.findUniqueOrThrow({
            where,
            include: {
                pairs: {
                    include: {
                        player: true,
                        master: true,
                    }
                },
                players: true,
                ...includes
            }

        })

        return data as unknown as EventIncludesReturn
    } catch (error) {
        console.error(error)
        throw error
    }
}
export async function getDBManyEventsData(search?: PrismaGetManyEvents['where'], selected?: PrismaGetManyEvents['select']) {

    try {
        // const _selected = parseEventSelected(selected)
        const data = await db.findMany({
            where: search,
            select: { id: true, ...selected }

        })

        return { data }
    } catch (error) {
        console.error(error)
        throw error
    }


}


export async function getDbManyPairsData(search?: PrismaGetManyPairs['where'], selected?: PrismaGetManyPairs['select']) {



    try {
        if (!search) {
            const data = await prisma.pair.findMany({
                select: selected
            })
            return { data }
        }
        const data = await prisma.pair.findMany({
            where: search,
            select: selected
        })
        return { data }
    } catch (error) {
        console.log(error)
        throw error
    }
}