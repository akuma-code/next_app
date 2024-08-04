'use server'

import prisma from "@/client/client"
import { makeSerializable } from "@/Helpers/serialize"
import { Prisma } from "@prisma/client"
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
                const res = await db[payload.type].findMany(payload.args)
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

boardDataReducer({ type: 'event', args: { where: { date_formated: '2024-07-09' } } })
boardDataReducer({ type: 'player', args: { where: { name: '123' } } })