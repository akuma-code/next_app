'use server'

import prisma from "@/client/client"
import { writeFileFn } from "@/Services/fs/data_service"

export async function getImportantData(options = { saveToDisk: false }) {

    const p = prisma.pair
    const e = prisma.event
    const pp = prisma.player
    const pairs_db = await p.findMany({
        select: {
            event: { select: { date_formated: true } },
            player: { select: { name: true } },
            master: { select: { name: true } }
        }
    })
    const players_db = await pp.findMany({
        select: { name: true }
    })
    const events_db = await e.findMany({
        where: { isDraft: false },
        select: {
            date_formated: true,
            players: { select: { name: true } },
            pairs: {
                select: {
                    event: { select: { date_formated: true } },
                    player: { select: { name: true } },
                    master: { select: { name: true } }
                }
            }
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
    const events = events_db.map(e => ({ date: e.date_formated, players: e.players.map(pp => pp.name), pairs: pair_map(e.pairs) }))
    const pairs = pairs_db.map(pp => ([pp.event.date_formated, pp.player.name, pp.master?.name] as const))
    const players = players_db.map(p => p.name)
    if (options.saveToDisk === true) {
        saveToHDD(players, 'saved_players')
        saveToHDD(events, 'saved_events')
        saveToHDD(pairs, 'saved_pairs')
    } else {
        console.log({ events, pairs, players })
    }
    return { events, pairs, players }
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