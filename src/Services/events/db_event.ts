'use server'

import prisma from "@/client/client"
import { makeSerializable } from "@/Helpers/serialize"
import { reseedMasters } from "@/seed/seed"
import { PrismaPlayer_ } from "@/Types"
import { Event, Prisma } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"
import { revalidatePath } from "next/cache"

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
    players: { select: { id: true, name: true } },
    pairs: { select: { id: true, eventId: true, masterId: true, playerId: true } },
    isDraft: false,
    cost: true
    // 
} satisfies Prisma.EventSelect


const defaultPairSelect = {
    id: true,
    eventId: true,
    masterId: true,
    playerId: true,
    firstPlayerId: true, secondPlayerId: true

} satisfies Prisma.PairSelect
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

                ...select
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
async function fetchServer() {
    'use server'

    try {
        const data = fetch(
            "https://akumadev-git-auth-akuma-codes-projects.vercel.app/api/backup"
        ).then(
            (r) => r.json(),
            (e) => console.error(e)
        );
        return data;
    } catch (error) {
        throw error
    }
}
async function fetchData() {
    const server_data = await fetchServer() as { alldata: { players: { id: number, name: string, ticket?: any | null }[], events: Prisma.EventGetPayload<{ select: typeof defaultEventSelect }>[], pairs: Prisma.PairGetPayload<{ select: { master: true, player: true, event: true } }>[] } } | undefined
    console.log({ server_data })
    return server_data?.alldata.players

}

export async function fetchAndCreatePlayers() {
    try {
        // const server_data = await fetchServer() as { players: { id: number, name: string }[], events: any[], pairs: any[] }
        const server_players = await fetchData()
        if (!server_players || server_players.length === 0) {
            console.log("no players")
            throw new Error("Fetch error")
        }

        const existed_players = await prisma.player.findMany({ select: { id: true, name: true, ticket: true, events: true } })


        // if (existed_players.length === server_players.length) return console.log("players in sync, all good")

        const to_create = server_players.filter(p => !existed_players.map(e => e.id).includes(p.id))

        // const create_data_players = server_data.players
        const validate = <T extends typeof to_create[number]>(player: T) => Prisma.validator<Prisma.PlayerUncheckedCreateInput>()({
            id: player.id, name: player.name, ticket: player.ticket ? ({
                connectOrCreate: {
                    where: { playerId: player.id },
                    create: player.ticket || undefined

                }
            }) : (undefined)
        })

        const validateUpsert = <T extends Partial<PrismaPlayer_>>(player: T) => Prisma.validator<Prisma.PlayerUpsertArgs>()({})
        const validated_players = server_players.map(validate)
        // const tsx_delete = prisma.player.deleteMany()

        const tsx = validated_players.map(p => prisma.player.create({ data: p }))

        const result = await prisma.$transaction(tsx)
        console.table(result)
        return result
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        revalidatePath("/")
    }
}

export async function sync_events_pairs() {
    try {
        await fetchAndCreatePlayers()
        await prisma.event.deleteMany()
        await prisma.pair.deleteMany()
        await reseedMasters()
        const { events, pairs } = await fetchServer().then(r => r.alldata) as { events: Prisma.EventGetPayload<{ select: typeof defaultEventSelect }>[], pairs: Prisma.PairGetPayload<{ select: { master: true, player: true, event: true } }>[] }


        const existed_events_id_pool = await prisma.event.findMany({ select: { id: true, } }).then(r => r.map(e => e.id))

        console.log("🚀 ~ sync_events_pairs ~ existed_events_id_pool:", existed_events_id_pool)


        const tsx_create_pairs = pairs.map(p => prisma.pair.create({
            data: { firstPlayerId: p.master?.id!, secondPlayerId: p.player.id, eventId: p.event.id, playerId: p.player.id }
        }))

        const validate_args = <T extends Prisma.EventGetPayload<{ select: typeof defaultEventSelect }>>(e: T) =>
            Prisma.validator<Prisma.EventUncheckedCreateInput>()({
                id: e.id, date_formated: e.date_formated, title: e.title,
                players: { connect: e.players.map(p => ({ id: p.id })) },


            }
            )

        if (existed_events_id_pool.length > 0) {
            const new_events = events.filter(e => !existed_events_id_pool.includes(e.id))


            const validated_events = new_events.map(validate_args)
            const tsx_create_new = validated_events.map(e =>
                prisma.event.create({
                    data: e

                })
            )
            return await prisma.$transaction(tsx_create_new)
        }

        const valid = events.map(validate_args)
        const tsx_create_new = valid.map(e =>
            prisma.event.create({
                data: e

            })
        )


        // const tsx_pairs_update = await sync_pairs(pairs)

        return await prisma.$transaction([...tsx_create_new, ...tsx_create_pairs])
        // .then(async (r) => await sync_pairs(pairs))



    } catch (error) {
        throw error
    }



}

export async function reSyncPlayers() {
    await prisma.player.deleteMany().then(console.log)
    await fetchAndCreatePlayers().then(console.log)
}