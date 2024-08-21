'use server'

import prisma from "@/client/client"
import { makeSerializable } from "@/Helpers/serialize"
import { Event, Prisma } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"

const db = prisma.event
const db_pairs = prisma.pair
interface PrismaGetOneEvent {
    where: Prisma.EventWhereUniqueInput
    select?: Prisma.EventSelect<DefaultArgs>
    include?: Prisma.EventInclude<DefaultArgs>


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
    config?: Partial<Pick<Prisma.EventFindManyArgs, 'take' | 'skip' | 'orderBy'>>
}
interface PrismaGetManyPairs {
    where: Prisma.PairWhereInput
    select: Prisma.PairSelect
}

const defaultEventSelect = {
    id: true,
    date_formated: true,
    title: true,
    players: true,
    pairs: true,
    isDraft: false,


} satisfies Prisma.EventSelect

type EventPayloadSelected = Prisma.EventGetPayload<{ select: typeof defaultEventSelect }>

export interface GetEventResponse {

    id: number;
    date_formated: string;
    title: string | null;
    isDraft: boolean | null;
    pairs: Prisma.PairGetPayload<true>[]
    players: Prisma.PlayerGetPayload<true>[]
}


export async function getDBOneEventData<S extends Prisma.EventSelect<DefaultArgs>>(search: PrismaGetOneEvent['where'], selected?: S) {

    try {

        const data = await db.findUniqueOrThrow({
            where: search,
            select: {
                id: true,
                ...selected,
            }

        })

        return data
    } catch (error) {
        console.error(error)
        throw error
    }


}

export async function getEventWithConfig({ where, select }: PrismaGetOneEvent) {
    // if (!where.id) return null

    try {
        // const _selected = parseEventSelected(selected)
        const data = await db.findUniqueOrThrow({
            where,
            select: {
                id: true,


            }
        })

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
export async function getDBManyEventsData(search?: PrismaGetManyEvents['where'], selected?: PrismaGetManyEvents['select'], config?: PrismaGetManyEvents['config']) {

    try {
        // const _selected = parseEventSelected(selected)

        const data = await db.findMany({
            where: search,
            select: {
                id: true,

                ...selected
            },
            ...config

        })
        const total = await db.count()
        return { data, total }
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

export async function aggregatePlayers() {
    try {
        const players = await prisma.player.findMany({
            select: { _count: { select: { events: true } } }

        });
        const serial = makeSerializable(players);
        console.log(players)
        return serial.map(s => s._count)
    } catch (error) {
        throw error
    }
}

