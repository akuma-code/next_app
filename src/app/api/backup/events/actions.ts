'use server'

import prisma from "@/client/client"

export async function getImportantData() {

    const p = prisma.pair
    const e = prisma.event

    const pairs = await p.findMany({
        select: {
            event: { select: { date_formated: true } },
            player: { select: { name: true } },
            master: { select: { name: true } }
        }
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

    return { events, pairs }
}

export async function updatePairs() {
    try {
        const pairs = await prisma.pair.findMany()
        console.log({ pairs })

        const updated = pairs.map(p => ({ ...p, masterId: p.firstPlayerId, playerId: p.secondPlayerId }))

        const tsx = updated.map(pp => prisma.pair.update({
            where: { id: pp.id },
            data: {
                // player: { connect: { id: pp.secondPlayerId } },
                // master: { connect: { id: pp.firstPlayerId } },
                playerId: pp.secondPlayerId,
                masterId: pp.firstPlayerId,
            }
        }))

        const t = await prisma.$transaction(tsx)
        // console.log(t)
        return t
    } catch (error) {
        console.error(error)
    }

}