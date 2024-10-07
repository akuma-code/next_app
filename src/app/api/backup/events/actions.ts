'use server'

import prisma from "@/client/client"
import { readFileFn, writeFileFn } from "@/Services/fs/data_service"
import { Prisma } from "@prisma/client"
import players_file from "../../../../../public/json/saved_players.json"
import pairs_file from "../../../../../public/json/saved_pairs.json"
export async function getImportantData(options = { saveToDisk: false }) {

    const p = prisma.pair
    const e = prisma.event
    const pp = prisma.player
    const pairs_db = await p.findMany({
        // select: {
        //     event: { select: { date_formated: true } },
        //     player: { select: { name: true } },
        //     master: { select: { name: true } }
        // }
    })
    const players_db = await pp.findMany({
        select: { id: true, name: true, ticket: true, events: true, pair: true }
        // select: { name: true }
    })
    const events_db = await e.findMany({
        where: { isDraft: false },
        select: {
            date_formated: true,
            id: true,
            players: { select: { id: true } },
            pairs: true,
            title: true,
            cost: true

            // date_formated: true,
            // players: { select: { name: true } },
            // pairs: {
            //     select: {
            //         event: { select: { date_formated: true } },
            //         player: { select: { name: true } },
            //         master: { select: { name: true } }
            //     }
            // }
        }
    })
    const pair_map = (pairs: {
        player: {
            name: string;
        };
        event: {
            date_formated: string;
        };
        master: {
            name: string;
        } | null;
    }[]) => pairs.map(p => ({ player: p.player.name, master: p.master?.name }))
    // const events = events_db.map(e => ({ date: e.date_formated, players: e.players.map(pp => pp.name), pairs: pair_map(e.pairs) }))
    // const pairs = pairs_db.map(pp => ([pp.event.date_formated, pp.player.name, pp.master?.name] as const))
    // const players = players_db.map(p => p.name)
    if (options.saveToDisk === true) {
        saveToHDD(players_db, 'saved_players')
        saveToHDD(events_db, 'saved_events')
        saveToHDD(pairs_db, 'saved_pairs')
    } else {
        // console.log({ events, pairs, players })
    }
    return { events_db, pairs_db, players_db }
}
type HDD_PLayer = Prisma.PlayerGetPayload<{ select: { id: true, name: true, ticket: true, events: true, pair: true } }>
type HDD_Pair = Prisma.PairGetPayload<true>
export async function restorePlayers() {
    try {
        // const p = await readFileFn<HDD_PLayer[]>("./public/json/saved_players.json") as HDD_PLayer[]
        const pls = JSON.parse(JSON.stringify(players_file)) as HDD_PLayer[]
        // if (!p) return { message: "error while reading" }
        const validator = (p: HDD_PLayer) => Prisma.validator<Prisma.PlayerUncheckedCreateInput>()(
            {
                id: p.id, name: p.name,
                events: { connect: p.events.map(e => ({ id: e.id })) },

            })
        const validPlayers = pls.map(validator)

        const tsx = validPlayers.map(p => prisma.player.create({ data: p }))
        const res = await prisma.$transaction(tsx)
        console.table(res)
        return JSON.stringify(res)
    } catch (error) {
        console.log(error)
        throw error
    }

}

export async function restorePairs() {
    const saved = JSON.parse(JSON.stringify(pairs_file)) as HDD_Pair[]
    const validator = (pp: HDD_Pair) => Prisma.validator<Prisma.PairUncheckedCreateInput>()({

        id: pp.id,
        firstPlayerId: pp.firstPlayerId,
        masterId: pp.firstPlayerId,
        secondPlayerId: pp.secondPlayerId,
        playerId: pp.secondPlayerId,
        eventId: pp.eventId


    })

    const valid_pairs = saved.map(validator)
    const tsx = valid_pairs.map(p => prisma.pair.create({ data: p }))
    const result = await prisma.$transaction(tsx)
    console.table(result)
    return result


}

export async function updatePairs() {
    try {
        const pairs = await prisma.pair.findMany({ where: { eventId: { lte: 87 } } })
        console.log({ pairs })

        const updated = pairs.map(p => ({ ...p, masterId: p.firstPlayerId, playerId: p.secondPlayerId }))

        const tsx = updated.map(pp => prisma.pair.update({
            where: { id: pp.id },
            data: {
                player: { connect: { id: pp.secondPlayerId } },
                master: { connect: { id: pp.firstPlayerId } },
                // playerId: pp.secondPlayerId,
                // masterId: pp.firstPlayerId,
            }
        }))

        const t = await prisma.$transaction(tsx)
        // console.log(t)
        return t
    } catch (error) {
        console.error(error)
    }

}

async function saveToHDD<T>(data: T, file_name?: string) {
    try {
        const filename = file_name ? file_name : "saved_data"
        const file = await writeFileFn(filename, data)
        console.log({ file })
        return file
    } catch (error) {
        throw error
    }
}