'use server'

import prisma from "@/client/client"
import { makeSerializable } from "@/Helpers/serialize"
import { Event, Prisma } from "@prisma/client"
import { Payload } from "@prisma/client/runtime/library"
const db = {
    player: prisma.player,
    event: prisma.event
}

interface EventPayload {
    args: Prisma.EventFindManyArgs
    type: 'event'
}
interface PlayerPayload {
    args: Prisma.PlayerFindManyArgs
    type: 'player'
}
type BP = Payload<typeof prisma.event, 'create'>
type DataPayload =
    | EventPayload
    | PlayerPayload


type ReducerReturn = Promise<{
    id: number
    date_formated: string
    title: string | null
    isDraft: boolean | null
}[] | {
    id: number
    name: string
    profileId: number | null
    createdAt: Date
    updatedAt: Date
}[] | undefined>

export async function boardDataReducer<T extends DataPayload>(payload: T): ReducerReturn {
    try {

        switch (payload.type) {
            case "event": {

                const { select, where, include } = payload.args;

                const res = await db[payload.type].findMany({ where, select })
                return makeSerializable(res)
            }
            case "player": {
                const res = await db[payload.type].findMany(payload.args)
                return makeSerializable(res)
            }
        }
    } catch (error) {
        console.error(error)
    }

}

export async function getSelected(id: number) {
    const p = await prisma.event.findUnique({ where: { id } }).players();
    return p;
}


function groupByDate<T extends {
    id: number
    date_formated: string;
    _count: {
        players: number;
    }
}>(arr: T[]) {

    const res = arr.reduce((sum, c) => {
        const [y, m, d] = c.date_formated.split("-")
        const data = { month: m, total: c._count.players }
        if (sum[y]) sum[y].push(data)
        else sum[y] = []
        return sum


    }, {} as { [year: string]: { month: string, total: number }[] })

    for (let key in res) {
        res[key].reduce((s, c) => ({ ...s, total: ++c.total, m: c.month }))
    }
    return res
}